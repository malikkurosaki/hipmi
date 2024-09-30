"use client";
import { Button, Group, Stack } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useWibuRealtime } from "wibu-realtime";

export function RealtimePage({ token }: { token: string }) {
  const [data, setData] = useWibuRealtime({
    project: "hipmi",
    WIBU_REALTIME_TOKEN: token,
  });

  useShallowEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  function onKirim() {
    setData({
      id: "123",
      data: {
        "topic":"test",
      }

    });
  }
  return (
    <Stack p={"lg"}>
      <Group>
        <Stack>
          {JSON.stringify(data)}
          <Button onClick={onKirim}> Tekan Aja</Button>
        </Stack>
      </Group>
    </Stack>
  );
}
