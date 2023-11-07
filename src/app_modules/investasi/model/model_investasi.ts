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
  imagesId: string,
  MasterStatusInvestasi: MODEL_Status_investasi
  BeritaInvestasi: Model_Berita_Investasi[],
  DokumenInvestasi: null;
  ProspektusInvestasi: null;
  MasterPembagianDeviden: Model_All_Master
  MasterPencarianInvestor: Model_All_Master
  MasterPeriodeDeviden: Model_All_Master
  SahamTerbeli: null;
}

export interface MODEL_Status_investasi {
  id: string;
  name: string;
  color: string;
}

interface Model_All_Master {
  id: string
  name: string
  active: boolean
}

export interface Model_Berita_Investasi {
  id: string;
  title: string,
  deskripsi: string,
  imagesId: string,
  active: boolean,
  createdAt: Date;
  updatedAt: Date;
}

