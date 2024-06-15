import { MODEL_IMAGES } from "@/app_modules/model_global/interface";

export interface MODEL_PROFILE_OLD {
  id: string;
  username: string;
  nomor: string;
  Profile: {
    id: string;
    alamat: string;
    email: string;
    jenisKelamin: string;
    name: string;
    imagesId: string
    ImageProfile: {
      url: string;
    } 
    imagesBackgroundId: string,
    ImagesBackground: MODEL_IMAGES
  } 
}
