import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IResetCode extends Document {
  code: string;
  user: Types.ObjectId;
  expireAt: Date;
}

const resetCodeSchema = new Schema<IResetCode>(
  {
    code: {
      type: String,
      required: true,
      length: 6,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    expireAt: {
      type: Date,
      default: Date.now,
      index: { expires: "15m" },
    },
  },
  { timestamps: true }
);

const ResetCode: Model<IResetCode> =
  mongoose.models.ResetCode ||
  mongoose.model<IResetCode>("ResetCode", resetCodeSchema);

export default ResetCode;