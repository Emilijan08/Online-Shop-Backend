import { Document, Schema, model } from "mongoose";

interface IComment extends Document {
  text: string;
  user: string;
  createdAt: Date;
  rating: number;
}

interface IProduct extends Document {
  name: string;
  description: string;
  image: string;
  price: number;
  brand: string;
  category: string;
  comments: IComment[],
}

const commentSchema = new Schema<IComment>({
  text: { type: String, required: false },
  user: { type: String, required: false },
  createdAt: { type: Date, default: Date.now, required: false },
  rating: { type: Number, required: false },
});

const productSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  comments: [commentSchema, { required: false }],
});

export const Product = model<IProduct>("Product", productSchema);
export default Product;
