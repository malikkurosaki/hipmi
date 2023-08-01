"use client";
import { Box, Group, Paper, Text } from "@mantine/core";
import React from "react";
import { BsClipboardData } from "react-icons/bs";

export function DataStrukturOrganisasi() {
  return (
    <>
      <Box>
        <Paper shadow="lg" radius="md" p="md">
          <Box>
            <Group>
              <BsClipboardData size={25} color="#17594A" />
              <Text fw={"bold"} color="#17594A" fz={20}>
                DATA STRUKTUR ORGANISASI
              </Text>
            </Group>
          </Box>
        </Paper>
      </Box>
    </>
  );
}
