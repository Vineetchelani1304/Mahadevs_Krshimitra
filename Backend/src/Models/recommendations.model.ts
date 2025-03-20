import mongoose, { Schema, Document } from 'mongoose';


interface IRecommendation extends Document {
    farmer_id: mongoose.Types.ObjectId;
    recommended_crops: {
      crop_name: string;
      confidence_score: number;
    }[];
    actions: {
      irrigation_suggestion: string;
      fertilizer_suggestion: string;
    };
    createdAt?: Date; // Add this line
}

const RecommendationSchema = new Schema<IRecommendation>({
    farmer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Farmer', required: true },
    recommended_crops: [{
      crop_name: { type: String },
      confidence_score: { type: Number },
    }],
    actions: {
      irrigation_suggestion: { type: String },
      fertilizer_suggestion: { type: String },
    },
    createdAt: { type: Date, default: Date.now },
  });

export const Recommendation = mongoose.model<IRecommendation>('Recommendation', RecommendationSchema);
