import type { Request, Response } from "express";
import { Product } from "../models/product";
import { User } from "../models/user";

export async function getWishlist(req: Request, res: Response) {
  try {
    const userId = (req as any).user.id;
    const user = await User.findById(userId).populate("wishlist.productId");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user.wishlist);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export async function addToWishlist(req: Request, res: Response) {
  try {
    const userId = (req as any).user.id;
    const { productId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    user.wishlist.push(productId);
    await user.save();
    res.status(201).json(user.wishlist);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export async function removeFromWishlist(req: Request, res: Response) {
  try {
    const userId = (req as any).user.id;
    const { productId } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { wishlist: { productId } } },
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

export async function clearWishlist(req: Request, res: Response) {
  try {
    const userId = (req as any).user.id;

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
