"use client";

import { useShallowEffect } from "@mantine/hooks";
import { useAtom } from "jotai";
import { WibuRealtime } from "wibu-pkg";
import {
  gs_admin_ntf,
  gs_realtimeData,
  gs_user_ntf,
  IRealtimeData,
} from "./global_state";

export type TypeNotification = {
  type: "message" | "notification" 
  pushNotificationTo: "ADMIN" | "USER";
  dataMessage?: IRealtimeData;
  userLoginId?: string;
};

const WIBU_REALTIME_TOKEN: any = process.env.NEXT_PUBLIC_WIBU_REALTIME_TOKEN;
export default function RealtimeProvider() {
  const [dataRealtime, setDataRealtime] = useAtom(gs_realtimeData);
  const [newAdminNtf, setNewAdminNtf] = useAtom(gs_admin_ntf);
  const [newUserNtf, setNewUserNtf] = useAtom(gs_user_ntf);

  useShallowEffect(() => {
    WibuRealtime.init({
      onData(data: TypeNotification) {
        if (data.type == "notification" && data.pushNotificationTo == "ADMIN") {
          setNewAdminNtf((e) => e + 1);
        }

        if (data.type == "notification" && data.pushNotificationTo == "USER") {
          setNewUserNtf((e) => e + 1);
          setDataRealtime(data.dataMessage as any);
        }

        if (data.type == "message") {
          // console.log(data.dataMessage);
          setDataRealtime(data.dataMessage as any);
        }
      },
      project: "hipmi",
      WIBU_REALTIME_TOKEN: WIBU_REALTIME_TOKEN,
    });
  }, []);

  return null;
}
