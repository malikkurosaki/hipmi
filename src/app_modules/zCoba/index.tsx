"use client";

import {
  BackgroundImage,
  Box,
  Button,
  Center,
  Group,
  LoadingOverlay,
  Paper,
  Skeleton,
  Stack,
  Text,
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
      <BackgroundImage src={"/aset/global/main_background.png"}>
        <Box h={"100vh"}>Apa</Box>
      </BackgroundImage>
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
