"use client"

import { Warna } from "@/app/lib/warna"
import { Button, CopyButton, Grid, Group, Text } from "@mantine/core"

export default function UploadBuktiTransferInvestasi(){
    return<>
    <Grid align="center">
        <Grid.Col span={"auto"}>

        <Text>Rekening</Text>
        </Grid.Col>
        <Grid.Col span={"auto"}>

        <Text>908765467897654567</Text>
        </Grid.Col>
        <Grid.Col span={"auto"}>

        <CopyButton value="908765467897654567">
      {({ copied, copy }) => (
        <Button compact radius={50} color={copied ? 'teal' : 'blue'} onClick={copy}>
          {copied ? 'Copied url' : 'Copy url'}
        </Button>
      )}
    </CopyButton>
        </Grid.Col>
    </Grid>
    </>
}