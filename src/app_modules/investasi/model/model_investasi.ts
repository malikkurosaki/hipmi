import { MODEL_User_profile } from "@/app_modules/home/models/user_profile";

export interface MODEL_Investasi {
  id: string;
  title: string;
  targetDana: string;
  hargaLembar: string;
  totalLembar: string;
  sisaLembar: string,
  lembarTerbeli: string
  roi: string;
  active: true;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
  imagesId: string;
  catatan: string
  progress: string,
  MasterStatusInvestasi: MODEL_Status_investasi;
  BeritaInvestasi: Model_Berita_Investasi[];
  DokumenInvestasi: Model_Dokumen_Investasi[];
  ProspektusInvestasi: Model_Prospektus_Investasi;
  MasterPembagianDeviden: Model_All_Master;
  MasterPencarianInvestor: Model_All_Master;
  MasterPeriodeDeviden: Model_All_Master;
}

export interface MODEL_Transaksi_Investasi {
  id: string;
  lembarTerbeli: string,
  totalTransfer: string,
  namaBank: string,
  nomorRekening: string
  active: true;
  createdAt: Date;
  updatedAt: Date;
  Author: MODEL_User_profile,
  Investasi: MODEL_Investasi
}

export interface MODEL_Status_investasi {
  id: string;
  name: string;
  color: string;
}

interface Model_All_Master {
  id: string;
  name: string;
  active: boolean;
}

export interface Model_Berita_Investasi {
  id: string;
  title: string;
  deskripsi: string;
  imagesId: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Model_Prospektus_Investasi {
  id: string
  url: string
  active: boolean;
  createdAt: Date
  updatedAt: Date
  investasiId: string
}

export interface Model_Dokumen_Investasi {
  id: string
  title: string
  url: string
  active: boolean;
  createdAt: Date
  updatedAt: Date
  investasiId: string
}

export interface Model_Nama_Bank {
  id: string,
  name: string,
  norek: string,
  active: boolean,
  createdAt: Date,
  updatedAt: Date
}
