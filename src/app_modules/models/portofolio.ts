export interface LIST_PORTOFOLIO {
  id: string;
  namaBisnis: string;
  alamatKantor: string;
  tlpn: string;
  deskripssi: string;
  masterBidangBisnisId: string;
  active: boolean;
  profileId: string
}

export interface BIDANG_BISNIS {
  id: string;
  name: string;
  active: boolean;
}

export interface MODEL_PORTOFOLIO {
  id: string;
  namaBisnis: string;
  alamatKantor: string;
  deskripsi: string;
  tlpn: string;
  active: boolean;
  MasterBidangBisnis: BIDANG_BISNIS;
  masterBidangBisnisId: string
  profileId: string,
}
