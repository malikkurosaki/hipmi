export interface MODEL_DONASI {
  id: string;
  title: string;
  target: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  imagesId: string;
  authorId: string,
  donasiMaster_KategoriId: string;
  donasiMaster_DurasiId: string;
  CeritaDonasi : MODEL_CERITA_DONASI
}

export interface MODEL_CERITA_DONASI {
  id: string;
  pembukaan: string,
  cerita: string,
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  imagesId: string
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


