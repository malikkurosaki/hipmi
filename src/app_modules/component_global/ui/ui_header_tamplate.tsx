"use client";

import {
  Header,
  Group,
  ActionIcon,
  Text,
  Title,
  Box,
  Loader,
} from "@mantine/core";
import { IconArrowLeft, IconChevronLeft } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { AccentColor, MainColor } from "../color/color_pallet";

export default function LayoutGlobal_UI_HeaderTamplate({
  title,
  posotion,
  // left button
  hideButtonLeft,
  iconLeft,
  routerLeft,
  customButtonLeft,
  // right button
  iconRight,
  routerRight,
  customButtonRight,
}: {
  title: string;
  posotion?: any;
  // left button
  hideButtonLeft?: boolean;
  iconLeft?: any;
  routerLeft?: any;
  customButtonLeft?: React.ReactNode;
  // right button
  iconRight?: any;
  routerRight?: any;
  customButtonRight?: React.ReactNode;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isRightLoading, setRightLoading] = useState(false);

  return (
    <>
      <Header
        height={"8vh"}
        sx={{
          //   borderRadius: "0px 0px 20px 20px",
          //   borderBottom: `1px solid ${AccentColor.blue}`,
          borderStyle: "none",
        }}
        bg={MainColor.darkblue}
      >
        <Group h={"100%"} position={posotion ? posotion : "apart"} px={"md"}>
          {hideButtonLeft ? (
            <ActionIcon disabled variant="transparent"></ActionIcon>
          ) : customButtonLeft ? (
            customButtonLeft
          ) : (
            <ActionIcon
              c={"white"}
              variant="transparent"
              radius={"xl"}
              onClick={() => {
                setIsLoading(true);
                routerLeft === undefined
                  ? router.back()
                  : router.push(routerLeft, { scroll: false });
              }}
            >
              {isLoading ? (
                <Loader color={AccentColor.yellow} size={20} />
              ) : iconLeft ? (
                iconLeft
              ) : (
                <IconChevronLeft />
              )}
            </ActionIcon>
          )}

          <Title order={5} c={MainColor.yellow}>
            {title}
          </Title>

          {customButtonRight ? (
            customButtonRight
          ) : iconRight === undefined ? (
            <ActionIcon disabled variant="transparent"></ActionIcon>
          ) : routerRight === undefined ? (
            <Box>{iconRight}</Box>
          ) : (
            <ActionIcon
              c={"white"}
              variant="transparent"
              onClick={() => {
                setRightLoading(true);
                router.push(routerRight);
              }}
            >
              {isRightLoading ? (
                <Loader color={AccentColor.yellow} size={20} />
              ) : (
                iconRight
              )}
            </ActionIcon>
          )}
        </Group>
      </Header>
    </>
  );
}
