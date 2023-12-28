import { CreateDonasi } from "@/app_modules/donasi";
import {
  Donasi_getMasterDurasi,
  Donasi_getMasterKategori,
} from "@/app_modules/donasi/fun";
import { funGetUserToken } from "@/app_modules/fun/fun_get_user_token";

export default async function Page() {
  const masterKategori = await Donasi_getMasterKategori();
  const masterDurasi = await Donasi_getMasterDurasi();
  const getToken = await funGetUserToken()
  const userId = getToken.id

  return (
    <CreateDonasi masterKategori={masterKategori} masterDurasi={masterDurasi} />
  );
}
