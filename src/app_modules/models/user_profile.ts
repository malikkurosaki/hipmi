export interface USER_PROFILE {
  id: string;
  username: string;
  nomor: string;
  Profile: {
    id: string;
    alamat: string;
    email: string;
    jenisKelamin: string;
    name: string;
    ImageProfile: {
      url: string;
    } | null;
  } | null;
}
