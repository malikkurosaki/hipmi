import { MainColor } from "@/app_modules/_global/color";
import {
  ComponentGlobal_NotifikasiBerhasil,
  ComponentGlobal_NotifikasiGagal,
  ComponentGlobal_NotifikasiPeringatan,
} from "@/app_modules/_global/notif_global";
import { Box, Button } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { profile_funUpdateBackground } from "../../fun/update/fun_update_background";
import { DIRECTORY_ID } from "@/app/lib";
import { funGlobal_UploadToStorage } from "@/app_modules/_global/fun";

export function Profile_ComponentButtonUpdateBackgroundProfile({
  profileId,
  file,
}: {
  profileId: string;
  file: File;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  async function onUpdate() {
    const uploadFile = await funGlobal_UploadToStorage({
      file: file,
      dirId: DIRECTORY_ID.profile_background,
    });
    if (!uploadFile.success)
      return ComponentGlobal_NotifikasiPeringatan("Gagal upload foto profile");

    const res = await profile_funUpdateBackground({
      profileId: profileId,
      fileId: uploadFile.data.id,
    });
    if (res.status === 200) {
      setLoading(true);
      ComponentGlobal_NotifikasiBerhasil(res.message);
      router.back();
    } else {
      ComponentGlobal_NotifikasiGagal(res.message);
    }
  }

  return (
    <>
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          style={{
            transition: "all 0.3s ease",
            position: "absolute",
            bottom: 20,
            width: 300,
          }}
          disabled={file ? false : true}
          loading={loading ? true : false}
          loaderPosition="center"
          radius={"xl"}
          onClick={() => onUpdate()}
          bg={MainColor.yellow}
          color="yellow"
          c={"black"}
        >
          Update
        </Button>
      </Box>
    </>
  );
}
