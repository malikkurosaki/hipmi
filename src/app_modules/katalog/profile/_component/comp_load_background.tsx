"use client";

import { APIs } from "@/app/lib";
import { routerImagePreview } from "@/app/lib/router_hipmi/router_image_preview";
import { AspectRatio, Box, Center, Image, Skeleton } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";

type IRadius = "xs" | "sm" | "md" | "lg" | "xl";
export function Profile_ComponentLoadBackgroundImage({
  fileId,
}: {
  fileId: string;
}) {
  const router = useRouter();
  const [isImage, setIsImage] = useState<boolean | null>(null);

  const url = APIs.GET({ fileId: fileId });

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
        <Center h={200} bg={"white"} style={{ borderRadius: "10px" }}>
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
      <Image
        onClick={() =>
          router.push(routerImagePreview.main({ id: fileId }), {
            scroll: false,
          })
        }
        style={{
          borderColor: "white",
          borderStyle: "solid",
          borderWidth: "1px",
          borderRadius: "5px",
        }}
        radius={5}
        height={200}
        alt="Image"
        src={url}
      />
    </>
  );
}
