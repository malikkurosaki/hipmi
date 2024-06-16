"use client";
import AppNotif from "@/app_modules/notif";
// import './globals.css'
import { CacheProvider } from "@emotion/react";
import { Image, MantineProvider, useEmotionCache } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { useServerInsertedHTML } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
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
            {/* <ToastContainer position="bottom-center" />
            <AppNotif /> */}
          </MantineProvider>
        </CacheProvider>
      </body>
    </html>
  );
}
