import { Validasi } from "@/app_modules/auth";
import { valueStatus } from "@/app_modules/auth/state/s_login";
import { useAtom } from "jotai";

export default function PageValidasi() {
  return (
    <>
      <Validasi />
    </>
  );
}
