import * as mongoose from 'mongoose';

export interface Sailing extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  deletedAt?: Date;
}

export const sailingRequiredFields = ['_id', 'name'];

const SailingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    deletedAt: {
      type: Date,
      required: false
    },
    isActive: {
      type: Boolean,
      required: false
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model<Sailing>('sailings', SailingSchema);
