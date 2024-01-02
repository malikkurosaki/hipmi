export interface MODEL_User_profile {
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
