"use client";
import { MainColor } from "@/app_modules/_global/color/color_pallet";
// import './globals.css'
import { CacheProvider } from "@emotion/react";
import {
  Box,
  Container,
  MantineProvider,
  rem,
  useEmotionCache,
} from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { useServerInsertedHTML } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";

export default function RootStyleRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  const cache = useEmotionCache();
  cache.compat = true;

  useServerInsertedHTML(() => (
    <style
      data-emotion={`${cache.key} ${Object.keys(cache.inserted).join(" ")}`}
      dangerouslySetInnerHTML={{
        __html: Object.values(cache.inserted).join(" "),
      }}
    />
  ));

  return (
    <html lang="en" data-theme="light">
      <head>
        <title>HIPMI</title>
      </head>
      <body suppressHydrationWarning={true}>
        <CacheProvider value={cache}>
          <MantineProvider withGlobalStyles withNormalizeCSS>
            <Notifications position="top-center" containerWidth={300} />
            {children}
            {/* <Box
              bg={"#252A2F"}
              pos={"fixed"}
              w={"100%"}
              h={"100%"}
              style={{
                overflowY: "auto",
              }}
            >
              <Container
                mih={"100vh"}
                p={0}
                size={rem(500)}
                bg={MainColor.darkblue}
              >
                
              </Container>
            </Box> */}
          </MantineProvider>
        </CacheProvider>
      </body>
    </html>
  );
}
