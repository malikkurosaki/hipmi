import {
  AccentColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";
import { Button, Paper, Radio, Stack, Text, Title } from "@mantine/core";
import { useState } from "react";

export function ComponentInvestasi_BoxMetodePembayaran({
  listBank,
}: {
  listBank: any[];
}) {
  const [bank, setBank] = useState(listBank);
  const [pilihBank, setPilihBank] = useState("");
  const [isLoading, setLoading] = useState(false);

  async function onProses() {
    console.log(pilihBank);
  }

  return (
    <>
      <Stack>
        <Radio.Group
          value={pilihBank}
          onChange={setPilihBank}
          withAsterisk
          color="yellow"
        >
          {bank.map((e, i) => (
            <Paper
              key={e.id}
              style={{
                backgroundColor: AccentColor.blue,
                border: `2px solid ${AccentColor.darkblue}`,
                padding: "15px",
                cursor: "pointer",
                borderRadius: "10px",
                color: "white",
                marginBottom: "15px",
              }}
            >
              <Radio
                styles={{
                  radio: {
                    color: "yellow",
                  },
                }}
                value={e.id}
                label={
                  <Title order={6} color="white">
                    {e.name}
                  </Title>
                }
              />
            </Paper>
          ))}
        </Radio.Group>

        <Button
          disabled={pilihBank === "" ? true : false}
          style={{ transition: "0.5s" }}
          loaderPosition="center"
          loading={isLoading ? true : false}
          radius={"xl"}
          onClick={() => {
            onProses();
          }}
          bg={MainColor.yellow}
          color="yellow"
          c={"black"}
        >
          Pilih
        </Button>
      </Stack>
    </>
  );
}
