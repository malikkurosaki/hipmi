export interface USER_PROFILE {
  id: string;
  username: string;
  nomor: string;
  Profile: {
    alamat: string;
    email: string;
    jenisKelamin: string;
    name: string;
    ImageProfile: {
      url: string;
    } | null;
  } | null;
}
