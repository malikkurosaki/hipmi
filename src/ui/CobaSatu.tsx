"use client";
"use dev";
import { DevBox } from "next-dev";
import { Card } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { genFetchApi } from "@/util/genFetchApi";

export function CobaSatu() {
  useShallowEffect(() => {
    genFetchApi
      .seeder({ isServer: false })
      .then(async (v) => {
        console.log(v)
      })
  }, []);
  return (
    <DevBox path="dnNjb2RlOi8vZmlsZS8vVXNlcnMvYmFnYXNiYW51bmEvRG9jdW1lbnRzL0JJUC9oaXBtaS9zcmMvdWkvQ29iYVNhdHUudHN4Ojc6MQ==">
      <Card>ini percobaan</Card>
    </DevBox>
  );
}
