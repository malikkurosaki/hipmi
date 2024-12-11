"use client";

import { APIs } from "@/app/lib";
import {
  ComponentGlobal_BoxUploadImage,
  ComponentGlobal_ButtonUploadFileImage,
} from "@/app_modules/_global/component";
import { AspectRatio, Center, Image, Stack } from "@mantine/core";
import { useState } from "react";
import { Profile_ComponentButtonUpdateBackgroundProfile } from "../../_component";
import { MODEL_PROFILE } from "../../model/interface";

export default function Profile_UpdateFotoBackground({
  dataProfile,
}: {
  dataProfile: MODEL_PROFILE;
}) {
  const [profile, setProfile] = useState(dataProfile);
  const [file, setFile] = useState<File | null>(null);
  const [image, setImage] = useState<any | null>(null);

  return (
    <>
      <Stack px={"xs"}>
        <ComponentGlobal_BoxUploadImage>
          <AspectRatio ratio={1 / 1} mt={5} maw={300} mx={"auto"}>
            <Image
              style={{ maxHeight: 250 }}
              alt="Background"
              src={
                image
                  ? image
                  : APIs.GET({
                      fileId: profile.imageBackgroundId as any,
                      size: "400",
                    })
              }
            />
          </AspectRatio>
        </ComponentGlobal_BoxUploadImage>
        <Center>
          <ComponentGlobal_ButtonUploadFileImage
            onSetFile={setFile}
            onSetImage={setImage}
          />
        </Center>

        <Profile_ComponentButtonUpdateBackgroundProfile
          file={file as any}
          profileId={profile.id}
        />
      </Stack>
    </>
  );
}
