"use client";

import { useShallowEffect } from "@mantine/hooks";
import { useAtom } from "jotai";
import { WibuRealtime } from "wibu-pkg";
import {
  gs_admin_ntf,
  gs_job_trigger,
  gs_realtimeData,
  gs_user_ntf,
  IRealtimeData,
} from "./global_state";

export type TypeNotification = {
  type: "message" | "notification" | "trigger";
  pushNotificationTo: "ADMIN" | "USER";
  dataMessage?: IRealtimeData;
  userLoginId?: string;
};

const WIBU_REALTIME_TOKEN: any = process.env.NEXT_PUBLIC_WIBU_REALTIME_TOKEN;
export default function RealtimeProvider({
  userLoginId,
}: {
  userLoginId: string;
}) {
  const [dataRealtime, setDataRealtime] = useAtom(gs_realtimeData);
  const [newAdminNtf, setNewAdminNtf] = useAtom(gs_admin_ntf);
  const [newUserNtf, setNewUserNtf] = useAtom(gs_user_ntf);
  const [triggerJob, setTriggerJob] = useAtom(gs_job_trigger);

  useShallowEffect(() => {
    WibuRealtime.init({
      onData(data: TypeNotification) {
        if (data.type == "notification" && data.pushNotificationTo == "ADMIN") {
          setNewAdminNtf((e) => e + 1);
        }

        if (
          data.type == "notification" &&
          data.pushNotificationTo == "USER" &&
          data.dataMessage?.userId == userLoginId
        ) {
          setNewUserNtf((e) => e + 1);
          setDataRealtime(data.dataMessage as any);
        }

        if (
          data.type == "trigger" &&
          data.pushNotificationTo == "USER" &&
          data.dataMessage?.kategoriApp == "JOB"
        ) {
          setTriggerJob(true);
        }
      },
      project: "hipmi",
      WIBU_REALTIME_TOKEN: WIBU_REALTIME_TOKEN,
    });
  }, []);

  return null;
}
