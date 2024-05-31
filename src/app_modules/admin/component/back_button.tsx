"use client";

import { Group, Button, Loader } from "@mantine/core";
import { IconChevronLeft } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ComponentGlobalAdmin_BackButton() {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

  return (
    <>
      <Group>
        <Button
          // loaderPosition="center"
          // loading={isLoading ? true : false}
          c={"gray"}
          leftIcon={
            isLoading ? <Loader size={"xs"} color={"gray"} /> : <IconChevronLeft />
          }
          variant="white"
          onClick={() => {
            setLoading(true);
            // setTimeout(() => , 3000);
            router.back();
          }}
        >
          Kembali
        </Button>
      </Group>
    </>
  );
}
