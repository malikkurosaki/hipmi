import { MODEL_USER } from "@/app_modules/home/model/interface";
import { MODEL_MASTER_BANK } from "@/app_modules/investasi/_lib/interface"; 
import { MODEL_IMAGES } from "@/app_modules/model_global/interface";

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
  terkumpul: string;
  namaBank: string;
  rekening: string;
  akumulasiPencairan: number;
  totalPencairan: number;

  authorId: string;
  donasiMaster_KategoriId: string;
  donasiMaster_DurasiId: string;
  donasiMaster_StatusDonasiId: string;
  CeritaDonasi: MODEL_CERITA_DONASI;
  Author: MODEL_USER;
  imageDonasi: MODEL_IMAGES;
  DonasiMaster_Ketegori: MODEL_DONASI_ALL_MASTER;
  DonasiMaster_Durasi: MODEL_DONASI_ALL_MASTER;
  DonasiMaster_Status: MODEL_DONASI_ALL_MASTER;
  imageId: string
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
  imageId: string
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
  imageId: string
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
  imagesId: string
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  Author: MODEL_USER;
  authorId: string;
  donasiMaster_BankId: string;
  donasiMaster_StatusInvoiceId: string;
  Donasi: MODEL_DONASI;
  DonasiMaster_Bank: MODEL_DONASI_NAMA_BANK;
  DonasiMaster_StatusInvoice: MODEL_DONASI_ALL_MASTER;
  imageId: string
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

export interface MODEL_DONASI_KABAR {
  id: string;
  title: string;
  deskripsi: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  donasiId: string;
  imagesId: string;
  Donasi: MODEL_DONASI;
  ImagesKabar: MODEL_IMAGES;
  imageId: string
}

export interface MODEL_DONASI_NOTIF {
  id: string;
  isRead: boolean;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  donasi_KabarId: string;
  Donasi_Kabar: MODEL_DONASI_KABAR;
}

export interface MODEL_DONASI_PENCAIRAN_DANA {
  id: string;
  nominalCair: number;
  title: string;
  deskripsi: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  donasiId: string;
  imagesId: string
  Donasi: MODEL_DONASI;
}
