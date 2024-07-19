"use client"

import { Stack } from "@mantine/core";
import { Portofolio_UiListView } from "./ui_list_portofolio";
import { Profile_UiView } from "./ui_profile"; 
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
      <Stack mb={"lg"}>
        <Profile_UiView profile={profile as any} userLoginId={userLoginId} />
        <Portofolio_UiListView
          listPorto={listPorto as any}
          profile={profile}
          userLoginId={userLoginId}
        />
      </Stack>
    </>
  );
}