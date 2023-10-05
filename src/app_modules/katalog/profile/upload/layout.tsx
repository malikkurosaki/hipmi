"use client";

import {
  ActionIcon,
  AppShell,
  FileButton,
  Flex,
  Footer,
  Group,
  Header,
  Text,
} from "@mantine/core";
import { IconArrowLeft, IconUpload } from "@tabler/icons-react";
import { useAtom } from "jotai";
import toast from "react-simple-toasts";
import { gs_profile } from "../state/global_state";
import { useShallowEffect } from "@mantine/hooks";
import { loadDataProfile } from "../fun/fun_get_profile";
import { funUploadFoto } from "../fun/upload_foto";
import { useRouter } from "next/navigation";

export default function UploadFotoProfileLayout({
  children,
}: {
  children: any;
}) {
  const router = useRouter()
  const [profile, setProfile] = useAtom(gs_profile);
  useShallowEffect(() => {
    loadDataProfile(setProfile);
  }, []);

  return (
    <>
      <AppShell
        header={
          <Header height={50} px={"sm"}>
            <Group position="apart" h={50}>
              <ActionIcon
                variant="transparent"
                onClick={() => router.push("/dev/katalog/view")}
              >
                <IconArrowLeft />
              </ActionIcon>
              <Text>Upload Foto Profile</Text>
              <ActionIcon variant="transparent"></ActionIcon>
            </Group>
          </Header>
        }
        footer={
          <Footer height={70}>
            <Flex align={"center"} justify={"center"} h={70} gap={"xl"}>
              <Flex align={"center"} justify={"center"} h={70}>
                <Flex direction={"column"} align={"center"}>
                  <FileButton
                    onChange={async (files) => {
                      const id = profile?.id

                      if (!files) return toast("File Kosong");
                      const fd = new FormData();
                      fd.append("file", files);

                      const upFoto = await funUploadFoto(fd, id);
                      if (upFoto.success) {
                        toast("Upload berhasil");
                        router.push("/dev/katalog/view")
                        // loadDataProfile(valUser.id, setUser, setProfile);
                      }
                    }}
                    accept="image/png,image/jpeg,image/webp"
                  >
                    {(props) => (
                      <ActionIcon {...props}>
                        <IconUpload />
                      </ActionIcon>
                    )}
                  </FileButton>
                  <Text fz={"sm"} fw={"bold"}>
                    Upload
                  </Text>
                </Flex>
              </Flex>
            </Flex>

            {/*  */}
          </Footer>
        }
      >
        {children}
        {/* {JSON.stringify(profile)} */}
      </AppShell>
    </>
  );
}
