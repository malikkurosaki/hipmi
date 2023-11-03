"use client";

import {
  AppShell,
  Box,
  Button,
  Group,
  Header,
  ScrollArea,
} from "@mantine/core";
import React, { useState } from "react";

export default function LayoutPortofolioInvestasi({
  children,
}: {
  children: React.ReactNode;
}) {
  const [active, setActive] = useState(0);
  

  return (
    <>
      <AppShell
      >
        {children}
      </AppShell>
    </>
  );
}
