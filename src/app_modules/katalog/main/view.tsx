"use client";

import { Warna } from "@/app/lib/warna";
import {
  ActionIcon,
  BackgroundImage,
  Box,
  Center,
  Flex,
  Grid,
  Group,
  Image,
  Paper,
  Stack,
  Text,
} from "@mantine/core";
import { ProfileView } from "../profile";
import { ListPortofolioView } from "../portofolio";
import { MODEL_PROFILE_OLD } from "@/app_modules/home/model/user_profile";
import { LIST_PORTOFOLIO } from "@/app_modules/models/portofolio";
import User_Logout from "@/app_modules/auth/logout/view";
import { MODEL_PORTOFOLIO } from "../portofolio/model/interface";
import { MODEL_PROFILE } from "../profile/model/interface";

export default function KatalogView({
  profile,
  listPorto,
  userLoginId,
}: {
  profile: MODEL_PROFILE;
  listPorto: LIST_PORTOFOLIO;
  userLoginId: string;
}) {

  return (
    <>
      <Stack>
        <ProfileView profile={profile as any} userLoginId={userLoginId} />
        <ListPortofolioView
          listPorto={listPorto as any}
          profile={profile}
          userLoginId={userLoginId}
        />
        {profile.User.id === userLoginId ? <User_Logout /> : ""}
      </Stack>
    </>
  );
}
