export interface LIST_PORTOFOLIO {
  id: string;
  namaBisnis: string;
  alamatKantor: string;
  tlpn: string;
  deskripssi: string;
  masterBidangBisnisId: string;
  active: boolean;
}

export interface BIDANG_BISNIS {
  id: string;
  name: string;
  active: boolean;
}

export interface GET_ONE_PORTOFOLIO {
  id: string;
  namaBisnis: string;
  alamatKantor: string;
  deskripssi: string;
  tlpn: string;
  active: boolean;
  MasterBidangBisnis: BIDANG_BISNIS;
}
