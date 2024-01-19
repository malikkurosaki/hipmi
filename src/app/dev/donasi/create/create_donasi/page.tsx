import { CreateDonasi } from "@/app_modules/donasi";
import {
  Donasi_getMasterDurasi,
  Donasi_getMasterKategori,
} from "@/app_modules/donasi/fun";
import { User_getUserId } from "@/app_modules/fun_global/get_user_token";

export default async function Page() {
  const masterKategori = await Donasi_getMasterKategori();
  const masterDurasi = await Donasi_getMasterDurasi();

  return (
    <CreateDonasi masterKategori={masterKategori} masterDurasi={masterDurasi} />
  );
}
