export interface DUMMY_INVESTASI {
  id: string;
  authorId: string;
  title: string;
  targetDana: string;
  hargaLembar: string;
  totalLembar: string;
  roi: string;
  masterPeriodeDevidenId: string;
  masterPembagianDevidenId: string;
  masterPencarianInvestorId: string;
  imagesId: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  persentase: number;
  saham_beli: number;
  statusPorto: {
    id: number;
    status: string;
  };
  statusSaham: {
    id: number;
    status: string;
  };
}
