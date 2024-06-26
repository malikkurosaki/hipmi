export interface MODEL_PORTOFOLIO_Lama {
  id: string;
  namaBisnis: string;
  alamatKantor: string;
  tlpn: string;
  deskripssi: string;
  masterBidangBisnisId: string;
  active: boolean;
  profileId: string
}

export interface BIDANG_BISNIS_OLD {
  id: string;
  name: string;
  active: boolean;
}

export interface MODEL_PORTOFOLIO_OLD {
  id: string;
  namaBisnis: string;
  alamatKantor: string;
  deskripsi: string;
  tlpn: string;
  active: boolean;
  MasterBidangBisnis: BIDANG_BISNIS_OLD;
  masterBidangBisnisId: string
  profileId: string,
}
