import { MODEL_USER } from "@/app_modules/home/model/interface";
import { MODEL_IMAGES } from "@/app_modules/model_global/interface";

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
  ImageProfile: MODEL_IMAGES;
  imagesId: string;
  ImagesBackground: MODEL_IMAGES;
  imagesBackgroundId: string;
}
