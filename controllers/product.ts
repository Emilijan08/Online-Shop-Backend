import type { Request, Response } from "express";
import { Product } from "../models/product";

export async function getAllProducts(req: Request, res: Response) {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export async function createProduct(req: Request, res: Response) {
  const { name, description, image, price, brand, category, comments } =
    req.body;

  try {
    const product = new Product({
      name,
      description,
      image,
      price,
      brand,
      category,
      comments
    });
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export async function updateProduct(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export async function addComment(req: Request, res: Response) {
  const { id } = req.params;
  const { comment, username } = req.body;

  try {
    const product = await Product.findByIdAndUpdate(
      id,
      { $push: { comments: { text: comment, user: username } } },
      { new: true },
    );

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json("Comment added!");
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export async function getComments(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const comments = await Product.findById(id, "comments");
    if (!comments) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(comments);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
