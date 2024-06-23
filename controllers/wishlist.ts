import type { Request, Response } from "express";
import { Types } from "mongoose";
import { Product } from "../models/product";
import { User } from "../models/user";

interface AuthenticatedRequest extends Request {
  user?: { id: string };
}

export async function getWishlist(req: AuthenticatedRequest, res: Response) {
  try {
    const userId = req.user!.id;
    const user = await User.findById(userId).populate("wishlist.productId");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user.wishlist);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export async function addToWishlist(req: AuthenticatedRequest, res: Response) {
  try {
    const userId = req.user!.id;
    const { productId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const wishlistItem = {
      productId: product._id, // Use product._id directly
      addedAt: new Date(),
    };

    user.wishlist.push(wishlistItem as any); // Explicitly cast to any to bypass the TypeScript check
    await user.save();
    res.status(201).json(user.wishlist);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export async function removeFromWishlist(
  req: AuthenticatedRequest,
  res: Response,
) {
  try {
    const userId = req.user!.id;
    const { productId } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { wishlist: { productId: new Types.ObjectId(productId) } } },
      { new: true },
    ).populate("wishlist.productId");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user.wishlist);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export async function clearWishlist(req: AuthenticatedRequest, res: Response) {
  try {
    const userId = req.user!.id;

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: { wishlist: [] } },
      { new: true },
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user.wishlist);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
