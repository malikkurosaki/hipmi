"use client";

import { WARNA } from "@/fun/color_tone";
import { Box, Group, Paper } from "@mantine/core";

export function Informasi() {
  return (
    <>
      <div>
        <Box>
          <Group position="center" sx={{
                borderColor: "red"
              }}>
            <Paper
              withBorder
              h={250}
              w={600}
              radius={30}
              
            
            >
              test
            </Paper>
          </Group>
        </Box>
        <Box bg={WARNA.hijau_muda} h={600} mt={-100} p={20}>
          <Paper h={100} w={100} withBorder>
            ok
          </Paper>
        </Box>
      </div>
    </>
  );
}
