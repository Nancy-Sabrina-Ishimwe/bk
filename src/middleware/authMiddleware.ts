// authMiddleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../model/userModel";
import { IUser } from "../model/userModel";

// Extend Express Request type to include our custom 'User' property
declare global {
  namespace Express {
    interface Request {
      User?: IUser; // or any appropriate type
    }
  }
}

// Define the payload structure of our JWT
interface JwtPayload {
  id: string;
  iat?: number;
  exp?: number;
}

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  let token: string | undefined;

  try {
    // 1) Check if token exists in Authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // 2) If no token, reject
    if (!token) {
      res.status(401).json({
        status: "Failed",
        message: "You are not logged in, please login",
      });
      return;
    }

    // 3) Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

    // 4) Check if user still exists
    const loggedInUser = await User.findById(decoded.id);
    if (!loggedInUser) {
      res.status(401).json({
        status: "Failed",
        message: "Token has expired, please login again",
      });
      return;
    }

    // 5) Attach user to request object
    req.User = loggedInUser;
    next();
  } catch (error: any) {
    res.status(500).json({
      status: "Failed",
      error: error.message,
    });
  }
};

export default authMiddleware;