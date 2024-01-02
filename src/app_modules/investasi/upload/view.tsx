"use client";

import { Warna } from "@/app/lib/warna";
import {
  AspectRatio,
  Button,
  Center,
  Divider,
  FileButton,
  Group,
  Image,
  Paper,
  Text,
  Title,
} from "@mantine/core";
import { useState } from "react";

export default function UploadGambarInvestasi() {
  const [img, setImg] = useState<any | null>();
  return (
    <>
      <Group position="center">
        <FileButton
          onChange={async (files :  any) => {
            const buffer = URL.createObjectURL(
              new Blob([new Uint8Array( await files.arrayBuffer())])
            );
            setImg(buffer);
          }}
          accept="image/png,image/jpeg"
        >
          {(props) => <Button {...props}>Upload image</Button>}
        </FileButton>
      </Group>

      {img && <Image alt="" src={img}/>}
    </>
  );
}
