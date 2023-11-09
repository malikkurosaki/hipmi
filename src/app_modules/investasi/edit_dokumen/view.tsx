"use client";

import {
  Paper,
  Grid,
  Center,
  Title,
  Divider,
  Button,
  Text,
  ActionIcon,
  Group,
  Modal,
} from "@mantine/core";
import {
  IconChevronRight,
  IconTrash,
  IconWorldShare,
} from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";
import { MODEL_Investasi } from "../model/model_investasi";
import _ from "lodash";
import funDeleteDokumenInvestasi from "../fun/fun_delete_dokumen";
import toast from "react-simple-toasts";
import funLoadDataInvestasi from "../fun/fun_load_data";
import { useDisclosure } from "@mantine/hooks";
import { Warna } from "@/app/lib/warna";

export default function EditDokumenInvestasi({
  dataInvestasi,
}: {
  dataInvestasi: MODEL_Investasi;
}) {
  const [dokumen, setDokumen] = useState(dataInvestasi);

  async function onDelete(id: string) {
    await funDeleteDokumenInvestasi(id).then(async (res) => {
      if (res.status === 200) {
        toast(res.message);

        const load = await funLoadDataInvestasi(dokumen.id);
        setDokumen(load as any);
      } else {
        toast(res.message);
      }
    });
  }

  return (
    <>
      {!_.isEmpty(dokumen.DokumenInvestasi) ? (
        dokumen.DokumenInvestasi.map((e) => (
          <Paper key={e.id} w={"100%"} h={50} bg={"gray"} mb={"md"}>
            <Grid
              align="center"
              justify="center"
              h={50}
              px={"sm"}
              onClick={() => ""}
            >
              <Grid.Col span={8}>
                <Text>{e.title}</Text>
              </Grid.Col>

              <Grid.Col span={4}>
                <Group position="center">
                  <Link href={`/file/${e.url}`} target="_blank">
                    <ActionIcon variant="transparent">
                      <IconWorldShare color="green" />
                    </ActionIcon>
                  </Link>
                  <ActionIcon
                    variant="transparent"
                    onClick={() => {
                      onDelete(e.id);
                    }}
                  >
                    <IconTrash color="red" />
                  </ActionIcon>
                </Group>
              </Grid.Col>
            </Grid>
          </Paper>
        ))
      ) : (
        <Center>
          <Title order={5}>Tidak ada file</Title>
        </Center>
      )}

      <Divider mt={"lg"} />
    </>
  );
}
