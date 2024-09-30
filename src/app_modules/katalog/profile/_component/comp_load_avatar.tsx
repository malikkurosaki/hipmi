"use client";

import { APIs } from "@/app/lib";
import { routerImagePreview } from "@/app/lib/router_hipmi/router_image_preview";
import { AccentColor } from "@/app_modules/_global/color";
import { Avatar, Image, Skeleton } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import { CSSProperties, useState } from "react";

export function Profile_ComponentAvatarProfile({
  fileId,
  style,
}: {
  fileId: string;
  style?: CSSProperties;
}) {
  const router = useRouter();
  const [isImage, setIsImage] = useState<boolean | null>(null);

  const url = APIs.GET({ fileId: fileId, size: "200" });

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
        src={url}
        onClick={() =>
          router.push(routerImagePreview.main({ id: fileId }), {
            scroll: false,
          })
        }
      />
    </>
  );
}
