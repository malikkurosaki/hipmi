import { MODEL_AUTHOR } from "@/app_modules/home/models/interface";
import { MODEL_IMAGES } from "@/app_modules/models/interface";

export interface MODEL_DONASI {
  id: string;
  title: string;
  target: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  imagesId: string;
  publishTime: Date;
  catatan: string,
  authorId: string;
  donasiMaster_KategoriId: string;
  donasiMaster_DurasiId: string;
  donasiMaster_StatusDonasiId: string;
  CeritaDonasi: MODEL_CERITA_DONASI;
  Author: MODEL_AUTHOR;
  imageDonasi: MODEL_IMAGES;
  DonasiMaster_Ketegori: MODEL_DONASI_ALL_MASTER;
  DonasiMaster_Durasi: MODEL_DONASI_ALL_MASTER;
  DonasiMaster_Status: MODEL_DONASI_ALL_MASTER;
}

export interface MODEL_CERITA_DONASI {
  id: string;
  pembukaan: string;
  cerita: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  imagesId: string;
  imageCeritaDonasi: MODEL_IMAGES
  donasiId: string
}

export interface MODEL_DONASI_ALL_MASTER {
  id: string;
  name: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface MODEL_DONASI_TEMPORARY {
  id: string;
  title: string;
  target: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  imagesId: string;
  donasiMaster_KategoriId: string;
  donasiMaster_DurasiId: string;
}
