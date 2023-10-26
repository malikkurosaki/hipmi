export interface INVESTASI {
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
  persentase: number
}
