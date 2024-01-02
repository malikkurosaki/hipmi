"use client";

import { AspectRatio, FileButton, Image, Paper, Title } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useAtom } from "jotai";
import { loadDataProfile } from "../fun/fun_get_profile";
import { gs_fotoProfile, gs_profile } from "../state/global_state";
import { getFotoProfile } from "../api/get-foto-profile";
import { useState } from "react";
import { ApiHipmi } from "@/app/lib/api";
import { myConsole } from "@/app/fun/my_console";

export default function UploadFotoProfile({imageUrl}: {imageUrl: any}) {
  const [img, setImg] = useState(imageUrl)
  return (
    <>
    {/* {JSON.stringify(foto)} */}
      <AspectRatio ratio={1 / 1} >
       <Paper  p={"lg"} shadow="xl">
       {img ? <Image alt="" src={`/img/${img}`} /> : <Image alt="" src={"/aset/avatar.png"} />}
       </Paper>
      </AspectRatio>
      {/* {JSON.stringify(profile)} */}
    </>
  );
}
