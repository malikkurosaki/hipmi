"use client"

import { Stack } from "@mantine/core";
import { Portofolio_UiView } from "../portofolio/ui_portofolio";
import { Profile_UiView } from "../profile/ui_profile";
import { MODEL_PORTOFOLIO } from "../portofolio/model/interface";
import { MODEL_PROFILE } from "../profile/model/interface";


export function Katalog_UiView({
  profile,
  listPorto,
  userLoginId,
}: {
  profile: MODEL_PROFILE;
  listPorto: MODEL_PORTOFOLIO;
  userLoginId: string;
}) {
  return (
    <>
      <Stack>
        <Profile_UiView profile={profile as any} userLoginId={userLoginId} />
        <Portofolio_UiView
          listPorto={listPorto as any}
          profile={profile}
          userLoginId={userLoginId}
        />
      </Stack>
    </>
  );
}