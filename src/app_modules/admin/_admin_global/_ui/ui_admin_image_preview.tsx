"use client";

import { APIs, pathAssetImage } from "@/app/lib";
import { Box, Center, Image, ScrollArea, Skeleton, Stack } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AdminGlobal_ComponentBackButton from "../back_button";

export function Admin_UiImagePreview({ fileId }: { fileId: string }) {
  const router = useRouter();
  const [isImage, setIsImage] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const url = APIs.GET({ fileId: fileId });

  useShallowEffect(() => {
    onLoadImage();
  }, []);

  async function onLoadImage() {
    const res = await fetch(url);
    try {
      if (res.ok) {
        return setIsImage(true);
      }
      setIsImage(false);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <Stack>
        <AdminGlobal_ComponentBackButton />

        <Box style={{ zIndex: 0 }} h={"90vh"} pos={"static"} px={"lg"}>
          {isImage === null ? (
            <Skeleton height={200} radius={"sm"} />
          ) : isImage ? (
            <ScrollArea h={"100%"}>
              <Center>
                <Image alt="Image" src={url} maw={500} miw={200} />
              </Center>
            </ScrollArea>
          ) : (
            <Box
              bg={"gray"}
              style={{
                borderColor: "white",
                borderStyle: "solid",
                borderWidth: "0.5px",
                borderRadius: "5px",
                height: 300,
              }}
            >
              <Center h={"100%"}>
                <Image
                  alt="Image"
                  height={100}
                  width={100}
                  src={pathAssetImage.no_image}
                />
              </Center>
            </Box>
          )}
        </Box>
      </Stack>
    </>
  );
}
