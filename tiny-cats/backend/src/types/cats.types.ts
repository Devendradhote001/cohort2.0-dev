import type { Document } from "mongoose";

export interface ICat extends Document {
  name: string;
  breed: string;
  description: string;
  kidsFriendly: boolean;
  apartmentFriendly: boolean;
  lifeSpan: number;
  energyLevel: string;
  image: string;
  color: string;

  createdAt?: Date;
  updatedAt?: Date;
}
