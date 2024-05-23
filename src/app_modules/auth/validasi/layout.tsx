"use client";

import { ActionIcon, AppShell, Box, Group, Header, Stack } from "@mantine/core";
import { IconChevronLeft } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import React from "react";

export default function LayoutValidasi({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <Stack >
      <Box
        bg={"white"}
        p={"md"}
        style={{
          position: "sticky",
          top: 0,
          zIndex: 99,
        }}
      >
        <ActionIcon variant="transparent" onClick={() => router.back()}>
          <IconChevronLeft />
        </ActionIcon>
      </Box>
      {children}
    </Stack>
  );
}

// export default function LayoutValidasi({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//     const router = useRouter()

//   return (
//     <>
//       <AppShell
//       bg={"red"}
//         header={
//           <Header height={50} sx={{borderStyle: "none"}} px={"md"} bg={"yellow"}>
//            <Group h={50} align="center">
//            <ActionIcon variant="transparent" onClick={() => router.back()} >
//               <IconChevronLeft />
//             </ActionIcon>
//            </Group>
//           </Header>
//         }
//       >
//         {children}
//       </AppShell>
//     </>
//   );
// }
