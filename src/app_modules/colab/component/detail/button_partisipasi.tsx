"use client";

import { Center, Button } from "@mantine/core";
import { useState } from "react";

export default function ComponentColab_ButtonPartisipasi() {
  const [apply, setApply] = useState(false);
  return (
    <>
      <Center>
        <Button
          radius={"xl"}
          color={apply ? "green" : "blue"}
          onClick={() => {
            setApply(true);
          }}
        >
          {apply ? "Telah Berpartisipasi" : "Partisipasi"}
        </Button>
      </Center>
    </>
  );
}
