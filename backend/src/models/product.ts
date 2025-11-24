import mongoose from 'mongoose';

interface IImage {
  fileName: string,
  originalName: string
}

export interface IProduct {
  title: string,
  image: IImage,
  category: string,
  description: string,
  price: number
}

const imageSchema = new mongoose.Schema<IImage>({
  fileName: { type: String },
  originalName: { type: String },
});

const ProductSchema = new mongoose.Schema<IProduct>({
  title: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
    unique: true,
  },
  image: imageSchema,
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: false,
    default: null,
  },
}, {
  versionKey: false,
});

export default mongoose.model<IProduct>('product', ProductSchema);
