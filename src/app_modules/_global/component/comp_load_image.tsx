"use client";

import { AspectRatio, Box, Center, Image } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useState } from "react";
import ComponentGlobal_Loader from "./loader";

export function ComponentGlobal_LoadImage({
  url,
  maw,
  h,
}: {
  url: string;
  maw?: number;
  h?: number;
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
      <Center h={h ? h : 250}>
        <ComponentGlobal_Loader variant="dots" size={50} />
      </Center>
    );

  if (!isImage)
    return (
      <>
        <Center h={250}>
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
      {h ? (
        <Image
          height={h}
          alt="Image"
          maw={maw ? maw : 200}
          m={"auto"}
          p={"xs"}
          src={url}
        />
      ) : (
        <Image
          alt="Image"
          maw={maw ? maw : 200}
          m={"auto"}
          p={"xs"}
          src={url}
        />
      )}
    </>
  );
}
