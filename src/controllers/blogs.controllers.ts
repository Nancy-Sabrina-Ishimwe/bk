// blogs.controllers.ts
import { Request, Response } from "express";
import multer from "multer";
import Posts from "../models/blogs.model";
import * as blogService from "../services/blogs.services";
import { validateCreatepost, validateUpdatePost } from "../validations/blogs.validation";

// Extend Request to include User (from authMiddleware) and file (from multer)
interface AuthRequest extends Request {
  User?: {
    _id: string;
    email?: string;
    name?: string;
    [key: string]: any;
  };
  file?: Express.Multer.File;
}

// controller to create a post
export const createPost = async (req: AuthRequest, res: Response): Promise<void> => {
  const { error, value } = validateCreatepost(req.body);
  if (error) {
    res.status(400).json({
      message: error.details[0].message,
    });
    return;
  }
  try {
    // checking if post already exists
    const { title } = req.body;
    const postExist = await Posts.findOne({ title });

    if (postExist) {
      res.status(403).json({
        status: "403",
        message: "Post already exists",
      });
      return;
    }

    const createdPost = await blogService.createPost(
      value,
      req.file,
      req.User?._id
    );
    res.status(201).json({
      status: "201",
      message: "Post created successfully",
      data: createdPost,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      status: "500",
      message: "Failed to create a post",
      error: error.message,
    });
  }
};

// controller to retrieve all posts
export const getPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const posts = await blogService.getPost();
    res.status(200).json({
      status: "200",
      message: "Posts are retrieved successfully",
      data: posts,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      status: "500",
      message: "Failed to retrieve posts",
      error: error.message,
    });
  }
};

// controller to retrieve single post by id
export const getOnePost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { postId } = req.params;
    const post = await blogService.getOnePost(postId);

    if (!post) {
      res.status(404).json({
        status: "404",
        message: "Post not found",
      });
      return;
    }

    res.status(200).json({
      status: "200",
      message: "Post retrieved successfully",
      data: post,
    });
  } catch (error: any) {
    res.status(500).json({
      status: "500",
      message: "Failed to retrieve post",
      error: error.message,
    });
  }
};

// controller to update post by id
export const updatePost = async (req: AuthRequest, res: Response): Promise<void> => {
  const { error, value } = validateUpdatePost(req.body);
  if (error) {
    res.status(400).json({
      message: error.details[0].message,
    });
    return;
  }
  try {
    const { id } = req.params;
    const findId = await Posts.findById(id);
    if (!findId) {
      res.status(404).json({
        status: "404",
        message: "Post not found",
      });
      return;
    }
    await blogService.updatePost(
      id,
      value,
      req.file,
      req.User?._id
    );
    res.status(201).json({
      status: "201",
      message: "Post Data Updated",
    });
  } catch (error: any) {
    res.status(500).json({
      status: "500",
      message: "Failed to Update Post Data",
      error: error.message,
    });
  }
};

// controller to delete a post
export const deletePost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const findId = await Posts.findById(id);
    if (!findId) {
      res.status(404).json({
        status: "404",
        message: "Post not found",
      });
      return;
    }
    await blogService.deletePost(id);
    res.status(200).json({
      status: "200",
      message: "Post deleted successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      status: "500",
      message: "Failed to delete post",
      error: error.message,
    });
  }
};

// get posts by category
export const getPostsByCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category } = req.params;
    const posts = await blogService.getPostsByCategory(category);
    res.status(200).json({
      status: 200,
      message: "Posts based category retrieved",
      data: posts,
    });
  } catch (error: any) {
    res.status(500).json({
      status: 500,
      message: "Failed to get art by posts",
      error: error.message,
    });
  }
};

// get post by title
export const getPostByTitle = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title } = req.params;
    const post = await blogService.getPostByTitle(title);
    res.status(200).json({
      status: 200,
      data: post,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: "Failed to get post by title",
      error: error.message,
    });
  }
};