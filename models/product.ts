import { Document, Schema, model } from 'mongoose'

interface IComment extends Document {
  text: string
  user: string
  createdAt: Date
}

interface IProduct extends Document {
  productName: string
  productImage: string
  price: number
  brandName: string
  gender: string
  type: string
  comments: IComment[]
}

const commentSchema = new Schema<IComment>({
  text: { type: String, required: false },
  user: { type: String, required: false },
  createdAt: { type: Date, default: Date.now, required: false }
})

const productSchema = new Schema<IProduct>({
  productName: { type: String, required: true },
  productImage: { type: String, required: true },
  price: { type: Number, required: true },
  brandName: { type: String, required: true },
  gender: { type: String, required: false },
  type: { type: String, required: false },
  comments: [commentSchema, { required: false }]
})

export const Product = model<IProduct>('Product', productSchema)
export default Product
