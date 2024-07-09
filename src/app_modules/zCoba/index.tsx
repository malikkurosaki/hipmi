"use client";

import {
  ActionIcon,
  Affix,
  BackgroundImage,
  Box,
  Button,
  Center,
  Group,
  LoadingOverlay,
  Paper,
  ScrollArea,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
  rem,
} from "@mantine/core";
import { useState } from "react";

import useInfiniteScroll, {
  ScrollDirection,
} from "react-easy-infinite-scroll-hook";
import { createItems, loadMore } from "./utils";
import { v4 as uuidv4 } from "uuid";
import { useShallowEffect } from "@mantine/hooks";
import { ScrollOnly } from "next-scroll-loader";
import _ from "lodash";
import ComponentGlobal_V2_LoadingPage from "../component_global/loading_page_v2";
import LayoutGlobal_UI_Tamplate from "../component_global/ui/ui_layout_tamplate";
import LayoutGlobal_UI_HeaderTamplate from "../component_global/ui/ui_header_tamplate";
import { Icon123, IconPencilPlus, IconX } from "@tabler/icons-react";
import { AccentColor, MainColor } from "../component_global/color/color_pallet";

const newData = Array(20)
  .fill(0)
  .map((e, i) => i + 1);

const data2 = [
  {
    id: 1,
    name: "bagas",
    age: 28,
  },
  {
    id: 2,
    name: "lukman",
    age: 25,
  },
  {
    id: 3,
    name: "marcel",
    age: 23,
  },
];

export default function Coba_TestLoading() {
  // const [data, setData] = useState<any[]>(newData);
  // const [isLoading, setIsLoading] = useState(false);

  // return (
  //   <>
  //     <ScrollOnly
  //       height="90vh"
  //       data={data}
  //       setData={setData}
  //       moreData={async () => {
  //         const newData = Array.from(
  //           { length: 50 },
  //           (_, i) => i + data.length + 1
  //         );
  //         await new Promise((resolve) => setTimeout(resolve, 2000));
  //         return newData;
  //       }}
  //     >
  //       {(item) => <div style={{height: 50}}> {item}</div>}
  //     </ScrollOnly>
  //   </>
  // );

  const [data, setData] = useState(data2);

  return (
    <>
      <LayoutGlobal_UI_Tamplate>
        <CreateButton />
      </LayoutGlobal_UI_Tamplate>
    </>
  );

  return (
    <>
      <Box h={"100%"} bg={"blue"}>
        {Array(50)
          .fill(0)
          .map((e, i) => (
            <Text key={i}>{i + 1}</Text>
          ))}
        <ComponentGlobal_V2_LoadingPage />
      </Box>
    </>
  );

  // Clone data
  return (
    <>
      <Box mt={"lg"}>
        <Stack>
          <Button
            onClick={() => {
              const clone = _.clone(data);
              const dataBaru = clone.map(
                (e) => (
                  e.id === 1,
                  {
                    ...e,
                    name: e.id === 1 ? "firman" : e.name,
                    age: e.id === 1 ? 30 : e.age,
                  }
                )
              );
              setData(dataBaru);
            }}
          >
            Update
          </Button>
        </Stack>

        <pre>{JSON.stringify(data, null, 2)}</pre>
      </Box>
    </>
  );
}

function CreateButton() {
  return (
    <>
      <ActionIcon
        p={3}
        variant="filled"
        radius={"xl"}
        size={"xl"}
        style={{
          position: "absolute",
          zIndex: 1,
          bottom: 150,
          right: 30,
        }}
      >
        <IconPencilPlus size={30} />
      </ActionIcon>

      {/* <Affix
        bg={"blue"}
        withinPortal
        portalProps={{}}
        position={{ bottom: rem(150), right: rem(30) }}
      >
        <ActionIcon
          style={{
            transition: "0.5s",
            border: `1px solid ${AccentColor.skyblue}`,
          }}
          bg={AccentColor.blue}
          size={"xl"}
          radius={"xl"}
          variant="transparent"
          onClick={() => {}}
        >
          <IconPencilPlus color="white" />
        </ActionIcon>
      </Affix> */}
    </>
  );
}

function BackgroundImageComponent() {
  const footer = (
    <SimpleGrid cols={4}>
      {Array.from({ length: 4 }).map((e, i) => (
        <Center key={i} h={"10vh"}>
          <Stack align="center" c={"white"} spacing={0}>
            <ActionIcon>
              <IconX color="white" />
            </ActionIcon>
            <Text>Apa</Text>
          </Stack>
        </Center>
      ))}
    </SimpleGrid>
  );
  return (
    <>
      <BackgroundImage src={"/aset/global/main_background.png"} h={"100vh"}>
        {/* Header */}
        <Box
          h={"8vh"}
          style={{
            zIndex: 98,
          }}
          w={"100%"}
          pos={"sticky"}
          top={0}
        >
          <LayoutGlobal_UI_HeaderTamplate title="Coba" />
        </Box>

        {/* Children */}
        <Box h={"82vh"} pos={"static"}>
          <ScrollArea h={"100%"} px={"md"}>
            {Array.from({ length: 10 }).map((e, i) => (
              <Box bg={"blue"} key={i} mb={"md"} py={"lg"}>
                {i + 1}
              </Box>
            ))}
          </ScrollArea>
        </Box>

        {/* Footer */}
        <Box style={{ position: "relative", bottom: 0 }} bg={"red"}>
          <Box
            style={{
              zIndex: 1,
              borderRadius: "20px 20px 0px 0px",
              borderTop: `2px solid ${AccentColor.blue}`,
              borderRight: `1px solid ${AccentColor.blue}`,
              borderLeft: `1px solid ${AccentColor.blue}`,
              position: "absolute",
              width: "100%",
              backgroundColor: MainColor.darkblue,
            }}
            color="blue"
            // pos={"fixed"}
            // bottom={0}
            h={"10vh"}
          >
            {footer}
          </Box>
        </Box>
      </BackgroundImage>
    </>
  );
}
