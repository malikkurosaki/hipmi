import { MODEL_PROFILE_OLD } from "@/app_modules/home/model/user_profile";

export interface MODEL_Investasi {
  id: string;
  title: string;
  targetDana: string;
  hargaLembar: string;
  totalLembar: string;
  sisaLembar: string;
  lembarTerbeli: string;
  roi: string;
  active: true;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
  imagesId: string;
  catatan: string;
  progress: string;
  MasterStatusInvestasi: MODEL_Status_investasi;
  BeritaInvestasi: Model_Berita_Investasi[];
  DokumenInvestasi: Model_Dokumen_Investasi[];
  ProspektusInvestasi: Model_Prospektus_Investasi;
  MasterPembagianDeviden: Model_All_Master;
  MasterPencarianInvestor: Model_All_Master;
  MasterPeriodeDeviden: Model_All_Master;
  MasterProgresInvestasi: Model_All_Master,
  masterPeriodeDevidenId: string;
  masterPembagianDevidenId: string;
  masterPencarianInvestorId: string;
  author: MODEL_PROFILE_OLD;
  countDown: Date
}

export interface MODEL_Transaksi_Investasi {
  id: string;
  namaBank: string;
  nomorRekening: string;
  transaction_id: string,
  status_message: string
  payment_type: string,
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
  quantity: string;
  price: string;
  gross_amount: string;
  merchant_name: string;
  redirect_url: string;
  token: string;
  Author: MODEL_PROFILE_OLD;
  masterStatusTransaksiInvestasiId: string;
  investasiId: string;
  Investasi: MODEL_Investasi;
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
  id: string;
  url: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  investasiId: string;
}

export interface Model_Dokumen_Investasi {
  id: string;
  title: string;
  url: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  investasiId: string;
}

export interface MODEL_DATA_BANK {
  id: string;
  name: string;
  norek: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Model_Status_Transaksi_Investasi {
  id: string;
  name: string;
  color: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}
