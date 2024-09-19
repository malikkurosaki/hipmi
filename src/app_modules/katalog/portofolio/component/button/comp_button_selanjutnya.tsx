import { RouterMap } from "@/app/lib/router_hipmi/router_map";
import { MainColor } from "@/app_modules/_global/color";
import {
  ComponentGlobal_NotifikasiGagal,
  ComponentGlobal_NotifikasiPeringatan,
} from "@/app_modules/_global/notif_global";
import { MODEL_PORTOFOLIO_OLD } from "@/app_modules/model_global/portofolio";
import { Button } from "@mantine/core";
import _ from "lodash";

import { useRouter } from "next/navigation";
import { useState } from "react";
import funCreatePortofolio from "../../fun/fun_create_portofolio";

export function Portofolio_ComponentButtonSelanjutnya({
  profileId,
  dataPorto,
  file,
  dataMedsos,
  setIsFile,
}: {
  profileId: string;
  dataPorto: MODEL_PORTOFOLIO_OLD;
  file: FormData;
  dataMedsos: any;
  setIsFile: any;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onSubmit() {
    const porto = {
      namaBisnis: dataPorto.namaBisnis,
      masterBidangBisnisId: dataPorto.masterBidangBisnisId,
      alamatKantor: dataPorto.alamatKantor,
      tlpn: dataPorto.tlpn,
      deskripsi: dataPorto.deskripsi,
    };

    if (_.values(porto).includes(""))
      return ComponentGlobal_NotifikasiPeringatan("Lengkapi Data");
    if (file === null) {
      setIsFile(true);
      return null;
    }

    const gambar = new FormData();
    gambar.append("file", file as any);

    const res = await funCreatePortofolio(
      profileId,
      porto as any,
      gambar,
      dataMedsos
    );
    if (res.status === 201) {
      setLoading(true);
      // ComponentGlobal_NotifikasiBerhasil("Berhasil disimpan");
      router.replace(RouterMap.create + res.id, { scroll: false });
    } else {
      ComponentGlobal_NotifikasiGagal("Gagal disimpan");
    }
  }
  return (
    <>
      <Button
        disabled={_.values(dataPorto).includes("") || file === null}
        mt={"md"}
        radius={50}
        loading={loading ? true : false}
        loaderPosition="center"
        onClick={() => {
          onSubmit();
        }}
        bg={MainColor.yellow}
        color="yellow"
        c={"black"}
      >
        Selanjutnya
      </Button>
    </>
  );
}
