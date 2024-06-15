"use client";

import { Box, Button, Stack, TextInput } from "@mantine/core";
import makuro_test from "./makuro_test";
import { useState } from "react";
import _, { forIn } from "lodash";

export default function ViewMakuro() {
  const [listnya, setListnya] = useState<any[]>([
    {
      name: "Voting",
      value: "",
    },
    { name: "Voting", value: "" },
  ]);

  return (
    <>
      <Stack p={24}>
        {listnya.map((e, k) => (
          <Box key={k}>
            <TextInput
              onChange={(v) => {
                const val = _.clone(listnya);
                val[k].value = v.currentTarget.value;
                setListnya([...val]);
              }}
              label={e.name}
            />
          </Box>
        ))}
        <Button
          onClick={() => {
            // const cek = listnya[listnya.length - 1]
            // console.log(cek.id + 1);

            if (listnya.length > 4) return console.log("ga bisa lebih");
            setListnya([...listnya, { name: "Voting", value: "" }]);
          }}
        >
          {" "}
          Tambah
        </Button>
        <Button
          onClick={() => {
            console.log(JSON.stringify(listnya, null, 4));
          }}
        >
          Hasilnya
        </Button>
      </Stack>
    </>
  );
}
