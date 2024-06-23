import { Document, model, Schema, Types } from "mongoose";

interface IWishlistItem extends Document {
  productId: Types.ObjectId;
  addedAt: Date;
}

interface IUser extends Document {
  username: string;
  password: string;
  role: string;
  wishlist: IWishlistItem[];
}

const wishlistItemSchema = new Schema<IWishlistItem>({
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  addedAt: { type: Date, default: Date.now },
});

const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" },
  wishlist: [wishlistItemSchema],
});

export const User = model<IUser>("User", userSchema);
export default User;
