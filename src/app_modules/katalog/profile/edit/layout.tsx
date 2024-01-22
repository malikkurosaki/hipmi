"use client";

import {
  ActionIcon,
  AppShell,
  Group,
  Header,
  Text,
  Title,
} from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import ComponentKatalog_HeaderTamplate from "../../component/header_tamplate";

export default function EditProfileLayout({ children }: { children: any }) {
  const router = useRouter();
  return (
    <>
      <AppShell
        header={<ComponentKatalog_HeaderTamplate title="Edit Profile" />}
      >
        {children}
      </AppShell>
    </>
  );
}
