export interface MODEL_Investasi {
  id: string;
  title: string;
  targetDana: string;
  hargaLembar: string;
  totalLembar: string;
  roi: string;
  active: true;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
  imagesId: string;
  MasterStatusInvestasi: MODEL_Status_investasi;
  BeritaInvestasi: Model_Berita_Investasi[];
  DokumenInvestasi: Model_Dokumen_Investasi[];
  ProspektusInvestasi: Model_Prospektus_Investasi;
  MasterPembagianDeviden: Model_All_Master;
  MasterPencarianInvestor: Model_All_Master;
  MasterPeriodeDeviden: Model_All_Master;
  SahamTerbeli: null;
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

interface Model_Prospektus_Investasi {
  id: string
  url: string
  active: boolean;
  createdAt: Date
  updatedAt: Date
  investasiId: string
}

interface Model_Dokumen_Investasi {
  id: string
  title: string
  url: string
  active: boolean;
  createdAt: Date
  updatedAt: Date
  investasiId: string
}
