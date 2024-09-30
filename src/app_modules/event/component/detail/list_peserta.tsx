"use client";

import {
  Center,
  Stack,
  Text,
  Title
} from "@mantine/core";
import _ from "lodash";

import {
  ComponentGlobal_AvatarAndUsername,
  ComponentGlobal_CardStyles,
} from "@/app_modules/_global/component";
import { useRouter } from "next/navigation";
import { MODEL_EVENT_PESERTA } from "../../model/interface";

export default function ComponentEvent_ListPeserta({
  listPeserta,
  total,
}: {
  listPeserta: MODEL_EVENT_PESERTA[];
  total: number;
}) {
  const router = useRouter();
  return (
    <>
      <ComponentGlobal_CardStyles>
        <Stack spacing={"md"} px={"sm"}>
          <Center>
            <Title order={5}>Daftar Peserta ({total})</Title>
          </Center>

          {_.isEmpty(listPeserta) ? (
            <Center>
              <Text fz={"xs"} fw={"bold"}>
                - Tidak ada peserta -
              </Text>
            </Center>
          ) : (
            <Stack>
              {listPeserta.map((e, i) => (
                <Stack key={i} spacing={"sm"}>
                  <ComponentGlobal_AvatarAndUsername
                    profile={e.User.Profile as any}
                    sizeAvatar={30}
                    fontSize={"sm"}
                  />
                  {/* <Divider /> */}
                </Stack>
              ))}
            </Stack>
          )}
        </Stack>
      </ComponentGlobal_CardStyles>
    </>
  );
}
