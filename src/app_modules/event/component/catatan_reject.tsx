"use client"

import { Paper, Stack, Text } from "@mantine/core"

export default function ComponentEvent_CatatanReject({catatan}: {catatan:string}){
    return<>
     <Paper bg={"blue.3"} p={"sm"}>
          <Stack spacing={0}>
            <Text fz={"xs"} fw={"bold"} fs={"italic"}>
              * Alasan Penolakan
            </Text>
            <Text fz={"xs"} fs={"italic"}>
              {catatan}
            </Text>
          </Stack>
        </Paper>
    </>
}