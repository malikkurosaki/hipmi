"use client";

import { AspectRatio, Box, Center, Image, Skeleton } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useState } from "react";

type IRadius = "xs" | "sm" | "md" | "lg" | "xl";
export function Profile_ComponentLoadBackgroundImage({
  url,
  radius,
}: {
  url: string;
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

  if (isImage === null) return <Skeleton h={200} w={"100%"} />;

  if (!isImage)
    return (
      <>
        <Center h={200} bg={"white"} style={{borderRadius: "10px"}} >
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
      <Image height={200} radius={radius ? radius : 0} alt="Image" src={url} />
    </>
  );
}
