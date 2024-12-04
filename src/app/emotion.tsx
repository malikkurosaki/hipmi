"use client";
// import './globals.css'
import { CacheProvider } from "@emotion/react";
import {
  MantineProvider,
  useEmotionCache
} from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { Provider } from "jotai";
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
            <Provider>{children}</Provider>
          </MantineProvider>
        </CacheProvider>
      </body>
    </html>
  );
}
