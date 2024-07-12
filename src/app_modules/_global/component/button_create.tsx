"use client";

import { RouterJob } from "@/app/lib/router_hipmi/router_job";
import { AccentColor } from "@/app_modules/_global/color/color_pallet";
import { ActionIcon, Loader } from "@mantine/core";
import { IconPencilPlus } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ComponentGlobal_CreateButton({ path }: { path: string }) {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

  return (
    <>
      <ActionIcon
        variant="transparent"
        radius={"xl"}
        size={"xl"}
        style={{
          position: "absolute",
          zIndex: 1,
          bottom: 100,
          right: 30,
          transition: "0.5s",
          border: `1px solid ${AccentColor.skyblue}`,
          backgroundColor: AccentColor.blue,
          padding: 3,
        }}
        onClick={() => {
          setLoading(true);
          router.push(path);
        }}
      >
        {isLoading ? (
          <Loader color={AccentColor.yellow} size={25} />
        ) : (
          <IconPencilPlus color="white" />
        )}
      </ActionIcon>
    </>
  );
}
