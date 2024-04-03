"use client"

import { Paper, Center, Title, ScrollArea, Box, Stack } from "@mantine/core";
import ComponentColab_AuthorNameOnHeader from "../header_author_name";

export default function ComponentColab_DetailListPartisipasiUser() {
  return (
    <>
      <Paper withBorder p={"md"}>
        <Center mb={"xl"}>
          <Title order={4}>Partispasi User (12)</Title>
        </Center>{" "}
        <ScrollArea h={400}>
          <Box h={400}>
            <Stack>
              {Array(10)
                .fill(0)
                .map((e, i) => (
                  <Box key={i}>
                    <ComponentColab_AuthorNameOnHeader isPembatas={true} />
                  </Box>
                ))}
            </Stack>
          </Box>
        </ScrollArea>
      </Paper>
    </>
  );
}