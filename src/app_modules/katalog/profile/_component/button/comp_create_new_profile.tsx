"use client";

import { RouterHome } from "@/app/lib/router_hipmi/router_home";
import { MainColor, AccentColor } from "@/app_modules/_global/color";
import {
  ComponentGlobal_NotifikasiPeringatan,
  ComponentGlobal_NotifikasiBerhasil,
  ComponentGlobal_NotifikasiGagal,
} from "@/app_modules/_global/notif_global";
import { validRegex } from "@/app_modules/katalog/component/regular_expressions";
import { Button } from "@mantine/core";
import _ from "lodash";

import { useState } from "react";
import funCreateNewProfile from "../../fun/fun_create_profile";
import { MODEL_PROFILE } from "../../model/interface";
import { useRouter } from "next/navigation";

export function Profile_ComponentCreateNewProfile({
  value,
  userLoginId,
  filePP,
  fileBg,
}: {
  value: MODEL_PROFILE;
  userLoginId: string;
  filePP: FormData;
  fileBg: FormData;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onSubmit() {
    const body = {
      userId: userLoginId,
      name: value.name,
      email: value.email,
      alamat: value.alamat,
      jenisKelamin: value.jenisKelamin,
    };
    if (_.values(body).includes(""))
      return ComponentGlobal_NotifikasiPeringatan("Lengkapi Data");
    if (!body.email.match(validRegex)) return null;

    const gambarPP = new FormData();
    gambarPP.append("filePP", filePP as any);

    const gambarBG = new FormData();
    gambarBG.append("fileBG", fileBg as any);

    if (!gambarPP)
      return ComponentGlobal_NotifikasiPeringatan("Lengkapi foto profile");
    if (!gambarBG)
      return ComponentGlobal_NotifikasiPeringatan(
        "Lengkapi background profile"
      );

    await funCreateNewProfile(body as any, gambarPP, gambarBG).then((res) => {
      if (res.status === 201) {
        setLoading(true);
        ComponentGlobal_NotifikasiBerhasil("Berhasil Membuat Profile", 3000);
        router.push(RouterHome.main_home, { scroll: false });
      } else {
        ComponentGlobal_NotifikasiGagal(res.message);
      }
    });
  }

  return (
    <>
      <Button
        loading={loading ? true : false}
        loaderPosition="center"
        mt={"md"}
        radius={50}
        bg={MainColor.yellow}
        color="yellow"
        onClick={() => {
          onSubmit();
        }}
        style={{
          border: `2px solid ${AccentColor.yellow}`,
          color: "black",
        }}
      >
        Simpan
      </Button>
    </>
  );
}
