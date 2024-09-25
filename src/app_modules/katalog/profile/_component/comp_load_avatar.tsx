"use client";

import { AccentColor } from "@/app_modules/_global/color";
import ComponentGlobal_Loader from "@/app_modules/_global/component/loader";
import { Avatar, Box, Center, Image, Paper, Skeleton } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { CSSProperties, useState } from "react";

export function Profile_ComponentAvatarProfile({
  url,
  style,
}: {
  url: string;
  style?: CSSProperties;
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

  if (isImage === null) {
    return (
      <Skeleton
        style={{ borderStyle: "solid", borderColor: AccentColor.darkblue }}
        radius={"50%"}
        h={100}
        w={100}
      />
    );
  }

  if (!isImage) {
    return (
      <>
        <Avatar
          variant="outline"
          size={100}
          bg={"gray"}
          radius={"50%"}
          style={style}
        >
          <Image
            alt="Avatar"
            height={100}
            width={100}
            src={"/aset/global/avatar.png"}
          />
        </Avatar>
      </>
    );
  }

  return (
    <>
      <Avatar
        bg={"white"}
        style={style}
        radius={"50%"}
        size={100}
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
