import { MODEL_AUTHOR } from "@/app_modules/home/models/interface";
import { Model_Nama_Bank } from "@/app_modules/investasi/model/model_investasi";
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
  catatan: string;
  progres: string;
  terkumpul: string
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
  imageCeritaDonasi: MODEL_IMAGES;
  donasiId: string;
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

export interface MODEL_DONASI_INFO_PENGGALANG {
  id: string;
  username: string;
  nomor: string;
  Donasi: MODEL_DONASI[];
}

export interface MODEL_DONASI_INVOICE {
  id: string;
  nominal: string;
  donasiId: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  Author: MODEL_AUTHOR
  authorId: string
  donasiMaster_BankId: string;
  donasiMaster_StatusInvoiceId: string;
  Donasi: MODEL_DONASI;
  DonasiMaster_Bank: MODEL_DONASI_NAMA_BANK;
  DonasiMaster_StatusInvoice: MODEL_DONASI_ALL_MASTER;
}

export interface MODEL_DONASI_NAMA_BANK {
  id: string;
  name: string;
  norek: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface MODEL_DONASI_ALL_MASTER {
  id: string;
  name: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}
