"use client";
import { ComponentNotifikasi_CardSkeleton } from "@/app_modules/notifikasi/component";
import { Box, Button, Flex, Paper, Stack, Title } from "@mantine/core";

export default function Page() {

  return<>
  <ComponentNotifikasi_CardSkeleton/>
  </>


  return (
    <Stack
      bg={"gray"}
      h={"100vh"}
      style={{
        position: "relative",
        width: "100%",
        overflow: "scroll",
      }}
    >
      <Box
        p={"md"}
        style={{
          display: "flex",
          //   width: "700px",
          gap: "20px",
          position: "relative",
          overflowX: "scroll",
        //   scrollSnapType: "x",
        //   scrollbarGutter: "unset",
          scrollbarWidth: "none",
          backgroundColor:"red"
        }}
      >
        <Flex gap={"md"} bg={"cyan"}>
          {Array.from(new Array(10), (_, i) => (
            <Paper component={Button} w={"200px"}  px={"md"} key={i}>
              Contoh
            </Paper>
          ))}
        </Flex>
      </Box>

      <Stack>
        <Title>Ini Bagian Yang Gak Ikut</Title>
      </Stack>
    </Stack>
  );
}
