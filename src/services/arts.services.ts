// // services/arts.services.ts
// import Arts, { IArt } from "../model/product.model";
// import { uploadToCloud, CloudinaryResult } from "../helper/cloud";
// import { Types } from "mongoose";

// // Define the shape of product data for creation/update
// interface ProductData {
//   name: string;
//   description: string;
//   category: string;
//   available_Products: number;
//   price: number;
// }

// export const createArts = async (
//   productsData: ProductData,
//   file?: Express.Multer.File,
//   user?: string | Types.ObjectId
// ): Promise<IArt> => {
//   let result: CloudinaryResult | undefined;
//   if (file) result = await uploadToCloud(file);
//   const { name, description, category, available_Products, price } = productsData;

//   // Check if product already exists
//   const existingArts = await Arts.findOne({ name });
//   if (existingArts) {
//     throw new Error("Products already exists");
//   }

//   return await Arts.create({
//     name,
//     description,
//     category,
//     available_Products,
//     price,
//     image: result?.secure_url,
//     owner: user,
//   });
// };

// // Get all arts
// export const getAllArts = async (): Promise<IArt[]> => {
//   return await Arts.find();
// };

// // Get art by id
// export const getArtsById = async (id: string): Promise<IArt> => {
//   const art = await Arts.findById(id).populate("owner", "name email profile");
//   if (!art) {
//     throw new Error("Product Id not found");
//   }
//   return art;
// };

// // Get arts by category
// export const getArtsByCategory = async (category: string): Promise<IArt[]> => {
//   const arts = await Arts.find({ category });
//   if (!arts || arts.length === 0) {
//     throw new Error("Products category not found");
//   }
//   return arts;
// };

// // Get art by name (title)
// export const getArtsByName = async (name: string): Promise<IArt> => {
//   const art = await Arts.findOne({ name }).populate("owner", "name email profile");
//   if (!art) {
//     throw new Error("Product name not found");
//   }
//   return art;
// };

// // Get arts by owner (any owner)
// export const getArtsByOwner = async (ownerId: string): Promise<IArt[]> => {
//   return await Arts.find({ owner: ownerId });
// };

// // Get arts by logged-in user (owner from token)
// export const getArtsByLoggedUser = async (ownerId: string): Promise<IArt[]> => {
//   const owners = await Arts.find({ owner: ownerId });
//   if (!owners || owners.length === 0) {
//     throw new Error("Product Id not found");
//   }
//   return owners;
// };

// // Update arts
// export const updateArts = async (
//   id: string,
//   productsData: ProductData,
//   file?: Express.Multer.File,
//   user?: string | Types.ObjectId
// ): Promise<IArt | null> => {
//   let result: CloudinaryResult | undefined;
//   if (file) result = await uploadToCloud(file);

//   const existingArt = await Arts.findById(id);
//   if (!existingArt) {
//     throw new Error("Product Id not found");
//   }

//   const { name, description, category, available_Products, price } = productsData;
//   return await Arts.findByIdAndUpdate(
//     id,
//     {
//       name,
//       description,
//       category,
//       image: result?.secure_url,
//       available_Products,
//       price,
//       owner: user,
//     },
//     { new: true } // Return the updated document
//   );
// };

// // Delete arts
// export const deleteArts = async (id: string): Promise<IArt | null> => {
//   const existingArt = await Arts.findById(id);
//   if (!existingArt) {
//     throw new Error("Product Id not found");
//   }
//   return await Arts.findByIdAndDelete(id);
// };