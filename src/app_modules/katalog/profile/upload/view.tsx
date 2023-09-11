"use client";
import {
  ActionIcon,
  Box,
  Button,
  Center,
  FileButton,
  FileInput,
  Group,
  Header,
  Image,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { IconUpload } from "@tabler/icons-react";
import { useRef, useState } from "react";
import { Dropzone } from "@mantine/dropzone";
import _ from "lodash";
import toast from "react-simple-toasts";
import { funUploadFoto } from "../fun/upload_foto";
import { useRouter } from "next/navigation";
import { IconChevronLeft } from "@tabler/icons-react";

export default function UploadFoto() {
  const [file, setFile] = useState<File | null>(null);
  const openRef: any = useRef<() => void>(null);
  const [loading, setLoading] = useState(false);
  const [hasilGambar, setHasilGambar] = useState<string | null>(null);
  const router = useRouter();

  return (
    <>
      <Header height={50} px={"sm"}>
        <Group position="apart" align="center" h={50}>
          <ActionIcon onClick={() => router.push("/dev/katalog/view")}>
            <IconChevronLeft size={20} />
          </ActionIcon>
          <Title order={4}>Upload Foto</Title>
          &nbsp; &nbsp; &nbsp; &nbsp; 
        </Group>
      </Header>
    

      <Stack spacing={"xl"} pt={100}>
        <Center>
          <Dropzone
            w={130}
            openRef={openRef}
            onDrop={async (files) => {
              setLoading(true);
              // console.log("accepted files", files)
              if (!files || _.isEmpty(files)) return toast("File kosong");
              const fd = new FormData();
              fd.append("file", files[0]);

              const upFoto = await funUploadFoto(fd);
              if (upFoto.success) {
                setHasilGambar(`/img/${upFoto.data.url}`);
                return setLoading(false), toast("success");
              }
            }}
            activateOnClick={false}
            styles={{ inner: { pointerEvents: "all" } }}
          >
            <Group position="center" align="center">
              <Button radius={50} compact onClick={() => openRef.current()}>
                Select files
              </Button>
            </Group>
          </Dropzone>
        </Center>
        <Center>
          <Box miw={300} pos={"relative"}>
            {hasilGambar && <Image src={hasilGambar ? hasilGambar: "/aset/avatar.png" } alt="" width={300} />}
          </Box>
        </Center>
      </Stack>
    </>
  );
}
