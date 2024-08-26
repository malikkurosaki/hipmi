import { NEW_RouterInvestasi } from "@/app/lib/router_hipmi/router_investasi";
import {
  AccentColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";
import { Button, Paper, Radio, Stack, Text, Title } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function Investasi_ViewMetodePembayaran({
  listBank,
}: {
  listBank: any[];
}) {
  const router = useRouter();
  const [bank, setBank] = useState(listBank);
  const [pilihBank, setPilihBank] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [total, setTotal] = useLocalStorage({
    key: "total_investasi",
    defaultValue: 0,
  });

  async function onProses() {
    router.push(NEW_RouterInvestasi.invoice + "1", { scroll: false });
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
