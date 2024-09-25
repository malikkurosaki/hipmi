"use client";

import { AspectRatio, Box, Center, Image } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useState } from "react";
import ComponentGlobal_Loader from "./loader";

type IRadius = "xs" | "sm" | "md" | "lg" | "xl";
export function ComponentGlobal_LoadImage({
  url,
  maw,
  h,
  radius,
}: {
  url: string;
  maw?: number | string;
  h?: number;
  radius?: IRadius;
}) {
  const [isImage, setIsImage] = useState<boolean | null>(null);

  useShallowEffect(() => {
    onLoadImage();
  }, []);

  async function onLoadImage() {
    try {
      const res = await fetch(url);
      if (res.ok) {
        return setIsImage(true);
      }
      setIsImage(false);
    } catch (error) {
      console.log(error);
    }
  }

  if (isImage === null)
    return (
      <Center h={250}>
        <ComponentGlobal_Loader variant="dots" size={50} />
      </Center>
    );

  if (!isImage)
    return (
      <>
        <Center h={250} >
          <Image
            alt="No Image"
            maw={150}
            m={"auto"}
            p={"xs"}
            src={"/aset/global/no-image.svg"}
          />
        </Center>
      </>
    );

  return (
    <>
      <Box h={h ? h : 250}>
        <Center h={"100%"}>
          <Image
            radius={radius ? radius : 0}
            alt="Image"
            maw={maw ? maw : 200}
            m={"auto"}
            p={"xs"}
            src={url}
          />
        </Center>
      </Box>
    </>
  );
}
