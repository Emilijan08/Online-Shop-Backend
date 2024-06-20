import { Document, Schema, model } from 'mongoose'

interface IUser extends Document {
  username: string
  password: string
  role: string
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' }
})

export const User = model<IUser>('User', userSchema)
export default User
