"use client";

import { Warna } from "@/app/lib/warna";
import {
  Paper,
  Grid,
  Center,
  Text,
  Title,
  Button,
  Divider,
  AspectRatio,
  Box,
  FileButton,
  Group,
  Select,
  TextInput,
  Image,
} from "@mantine/core";
import { IconCamera, IconChevronRight } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useState } from "react";
import toast from "react-simple-toasts";

export default function EditIntroInvestasi() {
  const router = useRouter();
  const [edit, setEdit] = useState(true);
  const [img, setImg] = useState<any | null>();
  const [value, setValue] = useState({
    title: "",
    targetDana: "",
    hargaLembar: "",
    totalLembar: "",
    roi: "",
    pencarianInvestorId: "",
    periodeDevidenId: "",
    pembagianDevidenId: "",
  });

  return (
    <>
      <Box>
        <AspectRatio ratio={16 / 9}>
          {img ? (
            <Image alt="" src={img} />
          ) : (
            <Image alt="" src={"/aset/no-img.png"} />
          )}
        </AspectRatio>
        <Group position="center" mt={"md"}>
          <FileButton
            onChange={async (files: any) => {
              const buffer = URL.createObjectURL(
                new Blob([new Uint8Array(await files.arrayBuffer())])
              );
              // setImg(buffer);
              // setFl(files);
            }}
            accept="image/png,image/jpeg"
          >
            {(props) => (
              <Button
                {...props}
                w={350}
                radius={50}
                // bg={Warna.biru}
                // onClick={() => router.push("/dev/investasi/upload")}
              >
                <IconCamera />
              </Button>
            )}
          </FileButton>
        </Group>

        <Center>
          <Box mt={"md"} w={350}>
            <TextInput
              label="Judul Proyek"
              onChange={(val) => {
                setValue({
                  ...value,
                  title: val.target.value,
                });
              }}
            />
            <TextInput
              label="Dana Dibutuhan"
              type="number"
              onChange={(val) => {
                setValue({
                  ...value,
                  targetDana: val.target.value,
                });
              }}
            />
            <TextInput
              label="Harga Per Lember"
              type="number"
              onChange={(val) => {
                setValue({
                  ...value,
                  hargaLembar: val.target.value,
                });
              }}
            />
            <TextInput
              label="Total Lembar"
              type="number"
              onChange={(val) => {
                setValue({
                  ...value,
                  totalLembar: val.target.value,
                });
              }}
            />
            <TextInput
              label="Rasio Keuntungan / ROI"
              type="number"
              onChange={(val) => {
                setValue({
                  ...value,
                  roi: val.target.value,
                });
              }}
            />
            <Select
              label="Pencarian Investor"
              // data={pencarianInvestor.map((e) => ({
              //   value: e.id,
              //   label: e.name,
              // }))}
              data={[]}
              onChange={(val) => {
                setValue({
                  ...(value as any),
                  pencarianInvestorId: val,
                });
              }}
            />
            <Select
              label="Periode Deviden"
              // data={periodeDeviden.map((e) => ({ value: e.id, label: e.name }))}
              data={[]}
              onChange={(val) => {
                setValue({
                  ...(value as any),
                  periodeDevidenId: val,
                });
              }}
            />
            <Select
              label="Pembagian Deviden"
              // data={pembagianDeviden.map((e) => ({
              //   value: e.id,
              //   label: e.name,
              // }))}
              data={[]}
              onChange={(val) => {
                setValue({
                  ...(value as any),
                  pembagianDevidenId: val,
                });
              }}
            />
          </Box>
        </Center>
        <Center my={"lg"}>
          <Button
            w={200}
            radius={50}
            bg={Warna.hijau_muda}
            color="green"
            //  onClick={() => onSubmit() }
            onClick={() => {router.back(), toast("Data terupdate")}}
          >
            Update
          </Button>
        </Center>
      </Box>
    </>
  );
}
