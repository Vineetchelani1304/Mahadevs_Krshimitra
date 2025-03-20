import mongoose, { Schema, Document } from 'mongoose';

// Farmer Model
interface IFarmer extends Document {
  name: string;
  email:string;
  password:string;
  location: {
    latitude: number;
    longitude: number;
    region: string;
  };
  crops_cultivated: string[];
  expense: number;
  income: number;
}

const FarmerSchema = new Schema<IFarmer>({
  name: { type: String, required: true },
  email:{type:String, required:true},
  location: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    region: { type: String, required: true },
  },
  crops_cultivated: [{ type: String }],
  expense: { type: Number },
  income: { type: Number },
  password:{type:String,required:true}
}, { timestamps: true });


export const Farmer = mongoose.model<IFarmer>('Farmer', FarmerSchema);
