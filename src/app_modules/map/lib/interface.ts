import { MODEL_USER } from "@/app_modules/home/model/interface";
import { MODEL_PORTOFOLIO } from "@/app_modules/katalog/portofolio/model/interface";

export interface MODEL_MAP {
  id: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  namePin: string;
  latitude: number;
  longitude: number;
  authorId: string;
  Author: MODEL_USER;
  portofolioId: string;
  Portofolio: MODEL_PORTOFOLIO
  imageMapId: string
  ImageMap: any
  imagePinId: string
  ImagePin: any
}
