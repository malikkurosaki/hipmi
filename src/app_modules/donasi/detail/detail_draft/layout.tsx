"use client";

import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";
import AppComponentGlobal_LayoutTamplate from "@/app_modules/_global/component_layout_tamplate";
import UIGlobal_Drawer from "@/app_modules/_global/ui/ui_drawer";
import UIGlobal_LayoutHeaderTamplate from "@/app_modules/_global/ui/ui_header_tamplate";
import UIGlobal_LayoutTamplate from "@/app_modules/_global/ui/ui_layout_tamplate";
import {
  ActionIcon,
  Button,
  Group,
  Header,
  Modal,
  Stack,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconTornado } from "@tabler/icons-react";
import {
  IconChevronLeft,
  IconCreditCard,
  IconDotsVertical,
  IconEdit,
  IconEditCircle,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function LayoutDetailDraftDonasi({
  children,
  donasiId,
}: {
  children: React.ReactNode;
  donasiId: string;
}) {
  const [openDrawer, setOpenDrawer] = useState(false);
  const router = useRouter();
  const [isLoadingDonasi, setLoadingDonasi] = useState(false);
  const [isLoadingCerita, setLoadingCerita] = useState(false);
  const [isLoadingRekening, setLoadingRekening] = useState(false);

  const listPage = [
    {
      id: "1",
      name: "Edit Donasi",
      icon: <IconEdit />,
      path: RouterDonasi.edit_donasi + donasiId,
    },
    {
      id: "2",
      name: "Edit Cerita Pengalang",
      icon: <IconTornado />,
      path: RouterDonasi.edit_cerita_penggalang + donasiId,
    },
    {
      id: "3",
      name: "Edit Rekening",
      icon: <IconCreditCard />,
      path: RouterDonasi.edit_rekening + donasiId,
    },
  ];

  return (
    <>
      <UIGlobal_LayoutTamplate
        header={
          <UIGlobal_LayoutHeaderTamplate
            title="Detail Draft"
            customButtonRight={
              <ActionIcon
                variant="transparent"
                onClick={() => setOpenDrawer(true)}
              >
                <IconDotsVertical color="white" />
              </ActionIcon>
            }
          />
        }
      >
        {children}
      </UIGlobal_LayoutTamplate>

      <UIGlobal_Drawer
        opened={openDrawer}
        close={() => setOpenDrawer(false)}
        component={listPage}
      />
    </>
  );

  // return (
  //   <>
  //     <AppComponentGlobal_LayoutTamplate
  //       header={
  //         <Header height={50} sx={{ borderStyle: "none" }}>
  //           <Group h={50} position="apart" px={"md"}>
  //             <ActionIcon
  //               variant="transparent"
  //               onClick={() => {
  //                 router.back();
  //               }}
  //             >
  //               <IconChevronLeft />
  //             </ActionIcon>
  //             <Title order={5}>Detail Draft</Title>
  //             <ActionIcon variant="transparent" onClick={() => open()}>
  //               <IconEdit />
  //             </ActionIcon>
  //           </Group>
  //         </Header>
  //       }
  //     >
  //       {children}
  //     </AppComponentGlobal_LayoutTamplate>
  //     <Modal opened={opened} onClose={close} centered withCloseButton={false}>
  //       <Stack>
  //         <Button
  //           loaderPosition="center"
  //           loading={isLoadingDonasi ? true : false}
  //           style={{ transition: "0.5s" }}
  //           variant="outline"
  //           radius={"xl"}
  //           w={"100%"}
  //           color="blue"
  //           onClick={() => {
  //             setLoadingDonasi(true);
  //             router.push(RouterDonasi.edit_donasi + `${donasiId}`);
  //           }}
  //         >
  //           Edit Donasi
  //         </Button>
  //         <Button
  //           loaderPosition="center"
  //           loading={isLoadingCerita ? true : false}
  //           style={{ transition: "0.5s" }}
  //           variant="outline"
  //           radius={"xl"}
  //           w={"100%"}
  //           color="teal"
  //           onClick={() => {
  //             setLoadingCerita(true);
  //             router.push(RouterDonasi.edit_cerita_penggalang + `${donasiId}`);
  //           }}
  //         >
  //           Edit Cerita
  //         </Button>
  //         <Button
  //           loaderPosition="center"
  //           loading={isLoadingRekening ? true : false}
  //           style={{ transition: "0.5s" }}
  //           variant="outline"
  //           radius={"xl"}
  //           w={"100%"}
  //           color="orange"
  //           onClick={() => {
  //             setLoadingRekening(true);
  //             router.push(RouterDonasi.edit_rekening + `${donasiId}`);
  //           }}
  //         >
  //           Edit Rekening
  //         </Button>
  //       </Stack>
  //     </Modal>
  //   </>
  // );
}
