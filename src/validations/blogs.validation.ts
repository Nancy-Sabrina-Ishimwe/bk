// validations/blogs.validation.ts
import Joi from "joi";

// Interface for the post input data
export interface CreatePostInput {
  title?: string;
  description?: string;
  category?: string;
  image?: string;
}

// Interface for update post input (same shape, but at least one field must be provided)
export interface UpdatePostInput {
  title?: string;
  description?: string;
  category?: string;
  image?: string;
}

// Validation schema for creating a post
const createPostSchema = Joi.object<CreatePostInput>({
  title: Joi.string().optional(),
  description: Joi.string().optional(),
  category: Joi.string().optional(),
  image: Joi.string().optional(),
});

// Validation schema for updating a post (at least one field required)
const updatePostSchema = Joi.object<UpdatePostInput>({
  title: Joi.string().optional(),
  description: Joi.string().optional(),
  category: Joi.string().optional(),
  image: Joi.string().optional(),
}).or('title', 'description', 'category', 'image');

// Function to validate post creation
export const validateCreatepost = (postData: CreatePostInput) => {
  return createPostSchema.validate(postData);
};

// Function to validate post update
export const validateUpdatePost = (postData: UpdatePostInput) => {
  return updatePostSchema.validate(postData);
};