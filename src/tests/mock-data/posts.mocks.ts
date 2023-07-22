import { ObjectId } from "bson";

export const singlePost = {
  id: new ObjectId().toHexString(),
  content: "test content",
  createdAt: new Date(),
  updatedAt: new Date(),
  userId: new ObjectId().toHexString(),
};
