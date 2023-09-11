"use client"

import { ActionIcon, AppShell, Group, Header, Title } from "@mantine/core"
import { IconChevronLeft } from "@tabler/icons-react"
import { useRouter } from "next/navigation"

export default function CreateProfileLayout({children} : {children: any}){
    const router = useRouter()
    return<>
    <AppShell
    header={
        <Header height={50} px={"sm"}>
        <Group position="apart" align="center" h={50}>
          <ActionIcon onClick={() => router.push("/dev/home")}>
            <IconChevronLeft size={20} />
          </ActionIcon>
          <Title order={4}>Data Profile</Title>
          
         &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
        </Group>
      </Header>
    }
    
    >
        {children}
    </AppShell>
    
    </>
}