// arts.controller.ts
import { Request, Response } from "express";
import * as artsService from "../services/arts.services";
import { validateArt } from "../validations/arts.validation";

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

export const createArts = async (req: AuthRequest, res: Response): Promise<void> => {
  const { error, value } = validateArt(req.body);
  if (error) {
    res.status(400).json({
      message: error.details[0].message,
    });
    return;
  }
  try {
    const art = await artsService.createArts(
      value,
      req.file,
      req.User?._id
    );

    res.status(201).json({
      status: "201",
      message: "Product created successfully",
      data: art,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      status: "500",
      message: "Failed to Upload a new Product",
      error: error.message,
    });
  }
};

// get all arts
export const getAllArts = async (req: Request, res: Response): Promise<void> => {
  try {
    const arts = await artsService.getAllArts();
    res.status(200).json({
      status: 200,
      data: arts,
    });
  } catch (error: any) {
    res.status(500).json({
      status: 500,
      message: "Failed to get all Products",
      error: error.message,
    });
  }
};

// get art by id
export const getArtsById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const art = await artsService.getArtsById(id);
    res.status(200).json({
      status: 200,
      data: art,
    });
  } catch (error: any) {
    res.status(500).json({
      status: 500,
      message: "Failed to get Product by id",
      error: error.message,
    });
  }
};

// get art by owner (any owner id from params)
export const getArtsByOwner = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const arts = await artsService.getArtsByOwner(id);
    res.status(200).json({
      status: 200,
      data: arts,
    });
  } catch (error: any) {
    res.status(500).json({
      status: 500,
      message: "Failed to get Product by owner",
      error: error.message,
    });
  }
};

// get arts by logged-in user (owner from token)
export const getArtsByLoggedUser = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const ownerId = req.User?._id;
    if (!ownerId) {
      res.status(401).json({ status: 401, message: "Unauthorized" });
      return;
    }
    const arts = await artsService.getArtsByLoggedUser(ownerId);

    res.status(200).json({
      status: 200,
      message: `Successfully retrieved ${arts.length} Products.`,
      data: arts,
    });
  } catch (error: any) {
    console.error(`Failed to get Products by owner: ${error.message}`);
    res.status(500).json({
      status: 500,
      message: "Failed to get Products by owner.",
      error: error.message,
    });
  }
};

// get art by category
export const getArtsByCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category } = req.params;
    const arts = await artsService.getArtsByCategory(category);
    res.status(200).json({
      status: 200,
      data: arts,
    });
  } catch (error: any) {
    res.status(500).json({
      status: 500,
      message: "Failed to get Product by category",
      error: error.message,
    });
  }
};

// get art by title (name)
export const getArtsByTitle = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name } = req.params;
    const arts = await artsService.getArtsByName(name);
    res.status(200).json({
      status: 200,
      data: arts,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: "Failed to get Product by title",
      error: error.message,
    });
  }
};

// update art by id
export const updateArts = async (req: AuthRequest, res: Response): Promise<void> => {
  const { error, value } = validateArt(req.body);
  if (error) {
    res.status(400).json({
      message: error.details[0].message,
    });
    return;
  }
  try {
    const { id } = req.params;

    const art = await artsService.updateArts(
      id,
      value,
      req.file,
      req.User?._id
    );

    res.status(201).json({
      status: "201",
      message: "Product Updated successfully",
      data: art,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      status: "500",
      message: "Failed to Update a new Product",
      error: error.message,
    });
  }
};

// delete art by id
export const deleteArts = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await artsService.deleteArts(id);
    res.status(200).json({
      status: 200,
      message: "Product deleted successfully",
      data: id,
    });
  } catch (error: any) {
    res.status(500).json({
      status: 500,
      message: "Failed to delete Product by id",
      error: error.message,
    });
  }
};