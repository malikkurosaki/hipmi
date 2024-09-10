"use client";

import { Group, Button, Loader } from "@mantine/core";
import { IconChevronLeft } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ComponentAdminGlobal_BackButton({
  path,
}: {
  path?: string;
}) {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

  return (
    <>
      <Group>
        <Button
          c={"gray"}
          leftIcon={
            isLoading ? (
              <Loader size={"xs"} color={"gray"} />
            ) : (
              <IconChevronLeft />
            )
          }
          variant="white"
          onClick={() => {
            setLoading(true);
            // setTimeout(() => , 3000);
            if (path == null) {
              router.back();
            } else {
              router.push(path);
            }
          }}
        >
          Kembali
        </Button>
      </Group>
    </>
  );
}
