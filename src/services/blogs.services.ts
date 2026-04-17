// services/blogs.services.ts
import Posts, { IPost } from "../model/blogs.model";
import { uploadToCloud, CloudinaryResult } from "../helper/cloud";
import { Types } from "mongoose";

// Define the shape of post data for creation/update
interface PostData {
  title: string;
  description: string;
  category: string;
}

// Service to create a post
export const createPost = async (
  postData: PostData,
  file?: Express.Multer.File,
  user?: string | Types.ObjectId
): Promise<IPost> => {
  const { title, description, category } = postData;
  let result: CloudinaryResult | undefined;
  if (file) result = await uploadToCloud(file);
  return await Posts.create({
    title,
    description,
    category,
    image: result?.secure_url,
    creator: user,
  });
};

// Service to retrieve all posts
export const getPost = async (): Promise<IPost[]> => {
  return await Posts.find().populate({
    path: "creator",
    select: "name email profile",
  });
};

// Service to retrieve a single post by id
export const getOnePost = async (postId: string): Promise<IPost | null> => {
  return await Posts.findById(postId).populate({
    path: "creator",
    select: "name email profile",
  });
};

// Get posts by category
export const getPostsByCategory = async (category: string): Promise<IPost[]> => {
  const posts = await Posts.find({ category }).populate({
    path: "creator",
    select: "name email profile",
  });
  if (!posts || posts.length === 0) {
    throw new Error("Posts category not found");
  }
  return posts;
};

// Get post by title
export const getPostByTitle = async (title: string): Promise<IPost | null> => {
  const post = await Posts.findOne({ title }).populate({
    path: "creator",
    select: "name email profile",
  });
  if (!post) {
    throw new Error("Post title not found");
  }
  return post;
};

// Service to update post info by id
export const updatePost = async (
  id: string,
  postData: PostData,
  file?: Express.Multer.File,
  user?: string | Types.ObjectId
): Promise<IPost | null> => {
  const { title, description, category } = postData;
  let result: CloudinaryResult | undefined;
  if (file) result = await uploadToCloud(file);
  return await Posts.findByIdAndUpdate(
    id,
    {
      title,
      description,
      category,
      image: result?.secure_url,
      creator: user,
    },
    { new: true } // Return updated document
  );
};

// Service to delete a post
export const deletePost = async (id: string): Promise<void> => {
  await Posts.findByIdAndDelete(id);
};