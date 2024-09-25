"use client";

import ComponentGlobal_Loader from "@/app_modules/_global/component/loader";
import { Avatar, Center } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useState } from "react";

export function Home_ComponentAvatarProfile({ url }: { url: string }) {
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

  if (isImage === null) {
    <Center>
      <ComponentGlobal_Loader />
    </Center>;
  }

  if (!isImage) {
    return (
      <>
        <Avatar
          radius={"xl"}
          size={25}
          sx={{
            borderStyle: "solid",
            borderWidth: "0.5px",
            borderColor: "white",
          }}
        />
      </>
    );
  }

  return (
    <>
      <Avatar
        radius={"xl"}
        size={25}
        sx={{
          borderStyle: "solid",
          borderWidth: "0.5px",
          borderColor: "white",
        }}
        src={url}
      />
    </>
  );
}
