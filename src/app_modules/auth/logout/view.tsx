"use client";
import { Button } from "@mantine/core";
import toast from "react-simple-toasts";
import { redirect, useRouter } from "next/navigation";
import { s_getOneUser } from "@/app_modules/home/state/s_get_one";
import { useAtom } from "jotai";
import { deleteCookies } from "../fun/fun-logout";

export default function Logout() {
  const router = useRouter();
  const [dataUser, setDataUser] = useAtom(s_getOneUser);

  async function onOut() {
    await fetch("/api/auth/logout")
    .then((res) => res.json()
    .then((val) => {
        console.log(val);
        if (val.status == 200) {
          router.push("/dev/auth/login");
        }
      })
    );
    // await deleteCookies()
  }
  return (
    <>
      <Button
        color="red"
        onClick={() => {
          onOut();
        }}
      >
        Logout
      </Button>
    </>
  );
}
