"use client";

import { AspectRatio, FileButton, Image, Paper, Title } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useAtom } from "jotai";
import { loadDataProfile } from "../fun/fun_get_profile";
import { gs_profile } from "../state/global_state";
import { getFotoProfile } from "../fun/api-get-foto-profile";
import { useState } from "react";
import { ApiHipmi } from "@/app/lib/api";
import { myConsole } from "@/app/fun/my_console";
import { loadFotoProfile } from "../fun/fun_get_foto_profile";

export default function UploadFotoProfile({data, gmbr}: {data: any, gmbr: any}) {
  const [profile, setProfile] = useState(data)
  useShallowEffect(() => {
    loadDataProfile(setProfile);
  }, []);

  const [foto, setFoto] = useState(gmbr)
  useShallowEffect(() => {
    loadFotoProfile(profile.imagesId, setFoto)
  },[])

  // const [foto, setFoto] = useState<any | null>(null);
  // useShallowEffect(() => {
  //   if (profile?.imagesId === undefined || profile?.imagesId === null) {
  //     myConsole("Waiting data");
  //   } else {
  //     getFotoProfile(profile?.imagesId).then((res) => setFoto(res?.url));
  //   }
  // }, [profile?.imagesId]);

  return (
    <>
    {/* {JSON.stringify(foto)} */}
      <AspectRatio ratio={1 / 1} >
       <Paper  p={"lg"}>
       {foto ? <Image alt="" src={ApiHipmi.get_foto + `${foto}`} /> : <Image alt="" src={"/aset/avatar.png"} />}
       </Paper>
      </AspectRatio>
      {/* {JSON.stringify(profile)} */}
    </>
  );
}
