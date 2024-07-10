"use client";

import {
  ActionIcon,
  Box,
  Button,
  Stack
} from "@mantine/core";
import { useState } from "react";

import { IconPencilPlus } from "@tabler/icons-react";
import _ from "lodash";
import LayoutGlobal_UI_Tamplate from "../component_global/ui/ui_layout_tamplate";


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
  const [data, setData] = useState(data2);
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <>
      <LayoutGlobal_UI_Tamplate>
        {/* <CreateButton /> */}
        <Button onClick={() => setOpenDrawer(true)}>Click</Button>
      </LayoutGlobal_UI_Tamplate>

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
