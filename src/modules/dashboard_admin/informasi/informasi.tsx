"use client";
import { Box, Group, Paper, Text } from "@mantine/core";
import React from "react";
import { HiOutlineInformationCircle } from "react-icons/hi";

export function Informasi() {
  return (
    <>
      <Box>
        <Paper shadow="lg" radius="md" p="md">
          <Box
            component="a"
            href="/dev/dashboard-admin/informasi"
            style={{ textDecoration: "none" }}
          >
            <Group>
              <HiOutlineInformationCircle size={25} color="#17594A" />
              <Text fw={"bold"} color="#17594A" fz={20}>
                INFORMASI
              </Text>
            </Group>
          </Box>
        </Paper>
      </Box>
    </>
  );
}
