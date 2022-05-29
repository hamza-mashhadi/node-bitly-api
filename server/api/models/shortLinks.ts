import mongoose from "mongoose";

export interface IShortLinksModel extends mongoose.Document {
  hash: string;
  shortHash:string;
  url: string;
  creationDate: string;
  expirationDate: string;
  creationCounter: number;
  accessCounter: number;
}

const schema = new mongoose.Schema(
  {
    hash: { type: String, unique: true, index: true, required: true },
    shortHash: { type: String, unique: true },
    url: String,
    creationCounter: Number,
    accessCounter: Number,
    creationDate: {
        type: Date,
        default: Date.now,
    },
    expirationDate: {
        type: Date,
        default: Date.now,
    },
  },
  {
    collection: "shortLinks",
  }
);

export const ShortLink = mongoose.model<IShortLinksModel>("ShortLink", schema);
