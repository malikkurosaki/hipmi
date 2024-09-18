import { Validasi } from "@/app_modules/auth";
import { auth_getKodeOtpById } from "@/app_modules/auth/fun/get_kode_otp_by_id";
import { ServerEnv } from "@/app/lib/server_env";


export default async function Page({ params }: { params: { id: string } }) {
  let nomor = params.id;
  const dataOtp = await auth_getKodeOtpById({nomor: nomor});
  

  return <Validasi dataOtp={dataOtp} />;
}
