"use client";

import Component_Logout from "@/app_modules/auth/logout/view";
import {
  Stack
} from "@mantine/core";
import { MODEL_PORTOFOLIO } from "../portofolio/model/interface";
import { Portofolio_UiView } from "../portofolio/ui_portofolio";
import { MODEL_PROFILE } from "../profile/model/interface";
import { Profile_UiView } from "../profile/ui_profile";

export default function KatalogView({
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
