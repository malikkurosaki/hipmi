"use client";

import { RouterNotifikasi } from "@/app/lib/router_hipmi/router_notifikasi";
import { MainColor } from "@/app_modules/_global/color/color_pallet";
import {
    BackgroundImage,
    Box,
    Button,
    Container,
    Flex,
    rem,
} from "@mantine/core";
import { useAtom } from "jotai";
import _ from "lodash";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { gs_notifikasi_kategori_app } from "../lib/global_state";

export default function Notifikasi_UiNewLayout({
  children,
  header,
  masterKategori,
}: {
  children: React.ReactNode;
  header?: React.ReactNode;
  masterKategori: any[];
}) {
  return (
    <>
      <Box
        w={"100%"}
        h={"100%"}
        style={{
          backgroundColor: MainColor.black,
          overflowX: "auto",
          overflowY: "auto",
          position: "fixed",
        }}
      >
        <Container mih={"100vh"} p={0} size={rem(500)} bg={MainColor.darkblue}>
          <BackgroundImage
            src={"/aset/global/main_background.png"}
            h={"100vh"}
            style={{ position: "relative" }}
          >
            <UIHeader header={header} />

            <UIChildren masterKategori={masterKategori}>{children}</UIChildren>
          </BackgroundImage>
        </Container>
      </Box>
    </>
  );
}

function UIHeader({ header }: { header: React.ReactNode }) {
  return (
    <>
      {header ? (
        <Box
          h={"8vh"}
          style={{
            zIndex: 10,
          }}
          w={"100%"}
          pos={"sticky"}
          top={0}
        >
          {header}
        </Box>
      ) : (
        ""
      )}
    </>
  );
}

function UIChildren({
  children,
  masterKategori,
}: {
  children: React.ReactNode;
  masterKategori: any[];
}) {
  const router = useRouter();
  const [mstrKategori, setMstrKategori] = useState(masterKategori);
  const [categoryPage, setCategoryPage] = useAtom(gs_notifikasi_kategori_app);

  return (
    <>
      <Box style={{ zIndex: 0 }} h={"92vh"} px={"xs"} pos={"static"}>
        <Box
          mb={"xs"}
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
                c={categoryPage === e.name ? "black" : "gray.5"}
                style={{
                  transition: "0.3s",
                  backgroundColor:
                    categoryPage === e.name
                      ? MainColor.yellow
                      : "GrayText",
                }}
                onClick={() => {
                  router.replace(
                    RouterNotifikasi.categoryApp({ name: _.lowerCase(e.name) }),
                    {
                      scroll: false,
                    }
                  );
                  setCategoryPage(e.name);
                  // onLoadDataNotifikasi(e.name);
                }}
              >
                {e.name}
              </Button>
            ))}
          </Flex>
        </Box>
        {children}
      </Box>
    </>
  );
}
