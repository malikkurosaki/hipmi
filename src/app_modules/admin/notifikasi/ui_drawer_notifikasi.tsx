import {
  gs_adminEventTriggerReview,
  gs_adminJobTriggerReview,
} from "@/app/lib/global_state";
import { MODEL_NOTIFIKASI } from "@/app_modules/notifikasi/model/interface";
import { Center, Loader, Paper, Text } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useAtom } from "jotai";
import _ from "lodash";
import { ScrollOnly } from "next-scroll-loader";
import { useRouter } from "next/navigation";
import { useState } from "react";
import adminNotifikasi_countNotifikasi from "./fun/count/count_is_read";
import adminNotifikasi_getByUserId from "./fun/get/get_notifikasi_by_user_id";
import { adminNotifikasi_findRouterEvent } from "./route_setting/event";
import { adminNotifikasi_findRouterJob } from "./route_setting/job";
import {
  IAdmin_ActiveChildId,
  IAdmin_ActivePage,
} from "./route_setting/type_of_select_page";
import AdminNotifikasi_ViewCardDrawer from "./view_card_drawer";

export function ComponentAdmin_UIDrawerNotifikasi({
  newAdminNtf,
  listNotifikasi,
  onChangeNavbar,
  onToggleNavbar,
  onLoadCountNotif,
}: {
  newAdminNtf: number;
  listNotifikasi: MODEL_NOTIFIKASI[];
  onChangeNavbar: (val: {
    id: IAdmin_ActivePage;
    childId: IAdmin_ActiveChildId;
  }) => void;
  onToggleNavbar: (val: any) => void;
  onLoadCountNotif: (val: any) => void;
}) {
  const [data, setData] = useState<MODEL_NOTIFIKASI[]>(listNotifikasi);
  const [activePage, setActivePage] = useState<number>(1);

  useShallowEffect(() => {
    if (newAdminNtf != 0) {
      onLoadData(setData);
    }
  }, [newAdminNtf, setData]);

  async function onLoadData(setData: any) {
    const loadListNotifikasi = await adminNotifikasi_getByUserId({
      page: activePage,
    });
    setData(loadListNotifikasi as any);
  }

  if (_.isEmpty(data)) {
    return (
      <>
        <Center>
          <Text c={"gray"} fz={"xs"}>
            Tidak ada notifikasi
          </Text>
        </Center>
      </>
    );
  }

  return (
    <>
      <Paper h={"100%"}>
        <ScrollOnly
          height="90vh"
          renderLoading={() => (
            <Center mt={"lg"}>
              <Loader color={"yellow"} />
            </Center>
          )}
          data={data}
          setData={setData}
          moreData={async () => {
            const loadData = await adminNotifikasi_getByUserId({
              page: activePage + 1,
            });

            setActivePage((val) => val + 1);

            return loadData;
          }}
        >
          {(item) => (
            <AdminNotifikasi_ViewCardDrawer
              data={item}
              activePage={activePage}
              onChangeNavbar={(val) => onChangeNavbar(val)}
              onLoadCountNotif={(val) => onLoadCountNotif(val)}
              onToggleNavbar={(val) => onToggleNavbar(val)}
              onLoadDataNotifikasi={(val) => setData(val)}
            />
          )}
        </ScrollOnly>

        {/* <Stack>
          {data.map((e, i) => (
           
          ))}
        </Stack> */}
      </Paper>
    </>
  );
}
