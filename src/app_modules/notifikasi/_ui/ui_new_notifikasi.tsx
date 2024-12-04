"use client";

import { Box, Button, Flex, Stack, Title } from "@mantine/core";
import UIGlobal_LayoutHeaderTamplate from "../../_global/ui/ui_header_tamplate";
import { Notifikasi_ViewNewMain } from "../_view";
import { Notifikasi_UiLayout, Notifikasi_UiView } from "../ui";
import { useState } from "react";
import { MainColor } from "@/app_modules/_global/color";
import { useRouter } from "next/navigation";
import { RouterNotifikasi } from "@/app/lib/router_hipmi/router_notifikasi";
import _ from "lodash";

export default function Notifikasi_UiNewMain({
  listNotifikasi,
  masterKategori,
  categoryName,
}: {
  listNotifikasi: any[];
  masterKategori: any[];
  categoryName: string;
}) {
  const router = useRouter();
  const [mstrKategori, setMstrKategori] = useState(masterKategori);
  const [activeKategori, setActiveKategori] = useState(categoryName);

  return (
    <>
      <Stack>
        <Box
          style={{
            display: "flex",
            gap: "20px",
            position: "relative",
            overflowX: "scroll",
            scrollbarWidth: "none",
          }}
        >
          <Flex gap={"md"}>
            {mstrKategori.map((e, i) => (
              <Button
                radius={"xl"}
                key={i}
                c={categoryName === _.lowerCase(e.name) ? "black" : "gray.5"}
                style={{
                  transition: "0.3s",
                  backgroundColor:
                    categoryName === _.lowerCase(e.name)
                      ? MainColor.yellow
                      : "GrayText",
                }}
                onClick={() => {
                //   router.replace(
                //     RouterNotifikasi.main({ name: _.lowerCase(e.name) }),
                //     {
                //       scroll: false,
                //     }
                //   );
                  setActiveKategori(_.lowerCase(e.name));
                  // onLoadDataNotifikasi(e.name);
                }}
              >
                {e.name}
              </Button>
            ))}
          </Flex>
        </Box>

        <Title>{activeKategori}</Title>
      </Stack>
      {/* <Notifikasi_UiNewLayout
        header={<UIGlobal_LayoutHeaderTamplate title="Notifikasi" />}
      >
        <Notifikasi_ViewNewMain
        //   listNotifikasi={listNotifikasi}
        //   masterKategori={masterKategori}
        />
      </Notifikasi_UiNewLayout> */}
    </>
  );
}
