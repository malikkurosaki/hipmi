"use client";

import {
  AppShell,
  Center,
  Footer,
  Header,
  Image,
  Paper,
  Text,
} from "@mantine/core";
import React from "react";

export default function LayoutLogin({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppShell
        // header={
        //   <Header height={180} sx={{ borderStyle: "none" }}>
        //     <Paper h={180} sx={{ borderRadius: "0 0 30px 30px" }}>
        //       <Center h={"100%"}>
        //         <Image
        //         mt={"xl"}
        //           height={130}
        //           width={130}
        //           alt="logo"
        //           src={"/aset/logo/logo-hipmi.png"}
        //         />
        //       </Center>
        //     </Paper>
        //   </Header>
        // }
        
      >
        {children}
      </AppShell>
    </>
  );
}
