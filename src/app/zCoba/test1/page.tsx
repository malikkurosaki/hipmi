"use client";
import {
  gs_admin_ntf,
  gs_realtimeData,
  IRealtimeData,
} from "@/app/lib/global_state";
import { Button, Stack } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useAtom } from "jotai";
import { WibuRealtime } from "wibu-pkg";
import { v4 } from "uuid";
import { useState } from "react";
const angka = 10;
export default function Page() {
  const [dataRealtime, setDataRealtime] = useAtom(gs_realtimeData);
  const [adminNtf, setAdminNtf] = useAtom(gs_admin_ntf);
  const [notif, setNotif] = useState(angka);
  
  useShallowEffect(() => {
    if (adminNtf) {
      setNotif((e) => e + 1);
    }
  }, [adminNtf]);

  async function onSend() {
    const newData: IRealtimeData = {
      appId: v4(),
      status: "Publish",
      userId: "user1",
      pesan: "apa kabar",
      title: "coba",
      kategoriApp: "INVESTASI",
      userRole: "ADMIN",
    };

    WibuRealtime.setData({
      type: "message",
      pushNotificationTo: "USER",
      dataMessage: newData,
    });
  }

  return (
    <Stack p={"md"} align="center" justify="center" h={"80vh"}>
      {notif}
      <Button
        onClick={() => {
          onSend();
        }}
      >
        Dari test 1
      </Button>
    </Stack>
  );
}
