import {Document, model, Model, Schema} from "mongoose";

export interface IAuthMethod extends Document {
  _id:        string;
  authType:   string;
  authId:     string;
  userId:     string;
  code:       string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

const AuthMethodSchema: Schema = new Schema({
  authType:   String,
  authId:     String,
  userId:     String,
  code:       String,
  createdAt:  Date,
  updatedAt:  Date
});

AuthMethodSchema.pre<IAuthMethod>('save', function(next) {
  const now = new Date();

  if (!this.createdAt) {
    this.createdAt = now;
  }
  this.updatedAt = now;
  next();
});

export const AuthMethod: Model<IAuthMethod> = model<IAuthMethod>('authmethod', AuthMethodSchema);
