import { LayoutValidasi } from "@/app_modules/auth";
import { ActionIcon, Button } from "@mantine/core";
import Link from "next/link";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LayoutValidasi>{children}</LayoutValidasi>
    </>
  );
}
