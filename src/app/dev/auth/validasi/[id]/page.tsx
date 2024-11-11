import { Validasi } from "@/app_modules/auth";
import { auth_getCodeOtpByNumber } from "@/app_modules/auth/fun/get_kode_otp_by_id";
import { redirect } from "next/navigation";
import { RouterAuth } from "@/app/lib/router_hipmi/router_auth";

export default async function Page({ params }: { params: { id: string } }) {
  let kodeId = params.id;
  const dataOtp = await auth_getCodeOtpByNumber({ kodeId: kodeId });
  // if (dataOtp === null) return redirect(RouterAuth.login);

  return <Validasi dataOtp={dataOtp as any} />;
}
