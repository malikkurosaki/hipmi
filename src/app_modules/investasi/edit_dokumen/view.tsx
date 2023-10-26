"use client"

import { Paper, Grid, Center, Title, Divider, Button, Text } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";

export default function EditDokumenInvestasi(){
    const [edit, setEdit] = useState(false);

  return (
    <>
      {edit ? (
        <Link
          href={"https://pii.or.id/uploads/dummies.pdf"}
          target="_blank"
          style={{ textDecorationLine: "none" }}
        >
          <Paper w={"100%"} h={50} bg={"gray"} mb={"md"}>
            <Grid
              align="center"
              justify="center"
              h={50}
              px={"sm"}
              onClick={() => ""}
            >
              <Grid.Col span={10}>
                <Text>Nama File.pdf</Text>
              </Grid.Col>
              <Grid.Col span={2}>
                <Center>
                  <IconChevronRight />
                </Center>
              </Grid.Col>
            </Grid>
          </Paper>
        </Link>
      ) : (
        <Center>
          <Title order={4}>Tidak ada file</Title>
        </Center>
      )}

      <Divider mt={"lg"} />

      <Center>
        <Button mt={"md"} compact radius={50}>
          Upload
        </Button>
      </Center>
    </>
  );
}