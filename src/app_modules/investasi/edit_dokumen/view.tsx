"use client";

import {
  AccentColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";
import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import { ActionIcon, Group, Paper, Text } from "@mantine/core";
import { IconFolderOpen, IconTrash, IconWorldShare } from "@tabler/icons-react";
import _ from "lodash";
import Link from "next/link";
import { useState } from "react";
import funDeleteDokumenInvestasi from "../fun/fun_delete_dokumen";
import funLoadDataInvestasi from "../fun/fun_load_data";
import { MODEL_INVESTASI } from "../_lib/interface";
import { IconFile } from "@tabler/icons-react";

export default function EditDokumenInvestasi({
  dataInvestasi,
}: {
  dataInvestasi: MODEL_INVESTASI;
}) {
  const [dokumen, setDokumen] = useState(dataInvestasi);

  async function onDelete(id: string) {
    await funDeleteDokumenInvestasi(id).then(async (res) => {
      if (res.status === 200) {
        ComponentGlobal_NotifikasiBerhasil(res.message);

        const load = await funLoadDataInvestasi(dokumen.id);
        setDokumen(load as any);
      } else {
        ComponentGlobal_NotifikasiGagal(res.message);
      }
    });
  }

  return (
    <>
      {!_.isEmpty(dokumen.DokumenInvestasi) ? (
        dokumen.DokumenInvestasi.map((e) => (
          <Paper
            key={e.id}
            style={{
              padding: "15px",
              backgroundColor: AccentColor.darkblue,
              border: `2px solid ${AccentColor.blue}`,
              borderRadius: "10px",
              color: "white",
              marginBottom: "15px",
            }}
          >
            <Group position="apart">
              <Text lineClamp={1}>{e.title}</Text>
              <Group position="center">
                <Link href={`/file/${e.url}`} target="_blank">
                  <ActionIcon variant="transparent">
                    <IconFolderOpen
                      style={{
                        color: MainColor.yellow,
                      }}
                    />
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
            </Group>
          </Paper>
        ))
      ) : (
        <ComponentGlobal_IsEmptyData />
      )}

      {/* <Divider mt={"lg"} /> */}
    </>
  );
}
