"use client";
import { myConsole } from "@/app/fun/my_console";
import { ApiHipmi } from "@/app/lib/api";
import { Button } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { gs_nomor, gs_otp } from "../state/state";

export default function Logout() {
  const router = useRouter();
  const [nomor, setnomor] = useAtom(gs_nomor);
  const [code, setCode] = useAtom(gs_otp);

  const onLogout = async () => {
    // MyConsole("keluar");

    await fetch(ApiHipmi.logout)
      .then((res) => res.json())
      .then((val) => {
        if (val.status == 200) {
          setnomor(null);
          setCode(null);

          return router.push("/dev/auth/login");
        }
      });
  };

  return (
    <>
      <Button compact onClick={() => onLogout()}>
        Logout
      </Button>
    </>
  );
}
