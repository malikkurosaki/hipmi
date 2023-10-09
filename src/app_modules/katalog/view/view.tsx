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
  Text,
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import {
  IconAddressBook,
  IconCamera,
  IconEditCircle,
  IconGenderFemale,
  IconGenderMale,
  IconHome,
  IconMail,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ProfileView, getProfile } from "../profile";
import { gs_profile } from "../profile/state/global_state";
import { myConsole } from "@/app/fun/my_console";
import { useAtom } from "jotai";
import { loadDataProfile } from "../profile/fun/fun_get_profile";
import { getFotoProfile } from "../profile/api/get-foto-profile";
import { ApiHipmi } from "@/app/lib/api";
import { PortofolioView } from "../portofolio";
import { User } from "@prisma/client";
import { USER_PROFILE } from "@/app_modules/models/user_profile";

export default function KatalogView({ user }: { user: USER_PROFILE }) {
  return (
    <>
      <ProfileView user={user} />
      <PortofolioView />
    </>
  );
}
