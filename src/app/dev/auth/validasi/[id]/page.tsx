import { Validasi } from "@/app_modules/auth";
import { auth_getKodeOtpById } from "@/app_modules/auth/fun/get_kode_otp_by_id";

export default async function Page({ params }: { params: { id: string } }) {
  let kodeOtpId = params.id;
  const dataOtp = await auth_getKodeOtpById(kodeOtpId);

  return <Validasi dataOtp={dataOtp} />;
}
