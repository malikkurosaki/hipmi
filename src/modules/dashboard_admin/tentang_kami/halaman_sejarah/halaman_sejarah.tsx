"use client";
import { Box, Group, Paper, Text } from "@mantine/core";
import React from "react";
import { HiOutlineUserGroup } from "react-icons/hi";

export function HalamanSejarah() {
  return (
    <>
      <Box>
        <Paper shadow="lg" radius="md" p="md">
          <Box>
            <Group>
              <HiOutlineUserGroup size={25} color="#17594A" />
              <Text fw={"bold"} color="#17594A" fz={20}>
                HALAMAN SEJARAH
              </Text>
            </Group>
          </Box>
        </Paper>
      </Box>
    </>
  );
}
