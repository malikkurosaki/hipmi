import { MODEL_USER } from "@/app_modules/home/model/interface";

export interface MODEL_MAP {
  id: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  namePin: string;
  latitude: number;
  longitude: number;
  authorId: string;
  Author: MODEL_USER
}
