"use client";

import { Group, Stack, Text, Title } from "@mantine/core";
import { list } from "postcss";
import ComponentAdminGlobal_HeaderTamplate from "../../component/header_tamplate";

export default function AdminAppInformation_MainView() {
  return (
    <>
      <Stack h={"100%"}>
        <ComponentAdminGlobal_HeaderTamplate name="App Information" />
        <InformasiWhatApps />
      </Stack>
    </>
  );
}

function InformasiWhatApps() {
  return (
    <>
      <Stack spacing={"xs"}>
        <Group
          position="apart"
          bg={"gray.4"}
          p={"xs"}
          style={{ borderRadius: "6px" }}
        >
          <Title order={4}>Informasi WhatsApp</Title>
          {/* <TextInput
            icon={<IconSearch size={20} />}
            radius={"xl"}
            placeholder="Masukan username"
            onChange={(val) => {
              onSearch(val.currentTarget.value);
            }}
          /> */}
        </Group>

        


      </Stack>
    </>
  );
}
