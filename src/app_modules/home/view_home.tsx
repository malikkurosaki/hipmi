"use client";

import { useEffect, useState } from "react";
import UIGlobal_LayoutHeaderTamplate from "../_global/ui/ui_header_tamplate";
import UIGlobal_LayoutTamplate from "../_global/ui/ui_layout_tamplate";
import { MODEL_JOB } from "../job/model/interface";
import {
  ComponentHome_ButtonHeaderLeft,
  ComponentHome_ButtonHeaderRight,
} from "./component/button_header";
import { Home_UiFooter, Home_UiView } from "./component/ui_home";
import { MODEL_USER } from "./model/interface";
import { useShallowEffect } from "@mantine/hooks";
import { gs_count_ntf, gs_user_ntf } from "@/app/lib/global_state";
import { useAtom } from "jotai";
import notifikasi_countUserNotifikasi from "../notifikasi/fun/count/fun_count_by_id";

export default function HomeView({
  dataUser,
  dataJob,
  countNotifikasi,
}: {
  dataUser: MODEL_USER;
  dataJob: MODEL_JOB[];
  countNotifikasi: number;
}) {
  const [countNtf, setCountNtf] = useState(countNotifikasi);
  const [newUserNtf, setNewUserNtf] = useAtom(gs_user_ntf);
  const [countLoadNtf, setCountLoadNtf] = useAtom(gs_count_ntf);

  useShallowEffect(() => {
    onLoadNotifikasi({
      onLoad(val) {
        setCountNtf(val);
      },
    });

    setCountNtf(countLoadNtf as any);
  }, [countLoadNtf, setCountNtf]);

  useShallowEffect(() => {
    setCountNtf(countNtf + newUserNtf);
    setNewUserNtf(0);
  }, [newUserNtf, setCountNtf]);

  async function onLoadNotifikasi({ onLoad }: { onLoad: (val: any) => void }) {
    const loadNotif = await notifikasi_countUserNotifikasi();
    onLoad(loadNotif);
  }

  return (
    <>
      <UIGlobal_LayoutTamplate
        header={
          <UIGlobal_LayoutHeaderTamplate
            title="HIPMI"
            customButtonLeft={
              <ComponentHome_ButtonHeaderLeft dataUser={dataUser} />
            }
            customButtonRight={
              <ComponentHome_ButtonHeaderRight
                dataUser={dataUser}
                countNotifikasi={countNtf}
              />
            }
          />
        }
        footer={<Home_UiFooter dataUser={dataUser} />}
      >
        <Home_UiView dataJob={dataJob} dataUser={dataUser} />
      </UIGlobal_LayoutTamplate>
    </>
  );
}
