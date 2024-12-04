import { MODEL_USER } from "@/app_modules/home/model/interface";

export interface MODEL_PROFILE {
  userId: string;
  User: MODEL_USER;
  id: string;
  name: string;
  email: string;
  alamat: string;
  jenisKelamin: string;
  active: string;
  createdAt: Date;
  updatedAt: Date;
  imageId?: string;
  imageBackgroundId?: string;
}
