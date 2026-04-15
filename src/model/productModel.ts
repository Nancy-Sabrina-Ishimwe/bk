import mongoose from "mongoose";
import { Document,Schema } from "mongoose";

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
}

const productSchema: Schema = new Schema({      
    name: { type: String, required: true },
    description: { type: String, required: true },      
    price: { type: Number, required: true },    


    category: { type: String, required: true },
    imageUrl: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model<IProduct>("Product", productSchema);