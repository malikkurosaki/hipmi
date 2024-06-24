"use client";

import ComponentAdminGlobal_TampilanRupiahDonasi from "@/app_modules/admin/component_global/tampilan_rupiah";
import ComponentDonasi_NotedBox from "@/app_modules/donasi/component/noted_box";
import { NotifBerhasil } from "@/app_modules/donasi/component/notifikasi/notif_berhasil";
import { NotifGagal } from "@/app_modules/donasi/component/notifikasi/notif_gagal";
import { NotifPeringatan } from "@/app_modules/donasi/component/notifikasi/notif_peringatan";
import {
  AspectRatio,
  Button,
  Center,
  FileButton,
  Image,
  Paper,
  Stack,
  Text,
  TextInput,
  Textarea,
  Title,
} from "@mantine/core";
import { IconCamera } from "@tabler/icons-react";
import _, { toNumber } from "lodash";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ComponentAdminDonasi_TombolKembali from "../../component/tombol_kembali";
import { AdminDonasi_funCreatePencairanDana } from "../../fun/create/fun_create_pencairan_dana";
import { AdminDonasi_AkumulasiPencairanById } from "../../fun/update/fun_update_akumulasi_pencairan";
import ComponentGlobal_ErrorInput from "@/app_modules/component_global/error_input";
import { ComponentAdminGlobal_NotifikasiPeringatan } from "@/app_modules/admin/component_global/admin_notifikasi/notifikasi_peringatan";
import { ComponentAdminGlobal_NotifikasiBerhasil } from "@/app_modules/admin/component_global/admin_notifikasi/notifikasi_berhasil";
import { ComponentAdminGlobal_NotifikasiGagal } from "@/app_modules/admin/component_global/admin_notifikasi/notifikasi_gagal";
import { AdminDonasi_getOneById } from "../../fun/get/get_one_by_id";

export default function AdminDonasi_PencairanDana({
  donasiId,
  danaTerkumpul,
  totalPencairan,
}: {
  donasiId: string;
  danaTerkumpul: string;
  totalPencairan: number;
}) {
  const [terkumpul, setTerkumpul] = useState(danaTerkumpul);
  const [total, setTotal] = useState(totalPencairan);

  return (
    <>
      <Stack>
        <ComponentAdminDonasi_TombolKembali />
        <TotalDanaView danaTerkumpul={terkumpul} totalPencairan={total} />
        <FormView
          danaTerkumpul={terkumpul}
          donasiId={donasiId}
          totalPencairan={total}
          onSuccess={(val) => {
            setTerkumpul(val.terkumpul);
            setTotal(val.totalPencairan);
            console.log(val)
          }}
        />
      </Stack>
    </>
  );
}

function TotalDanaView({
  danaTerkumpul,
  totalPencairan,
}: {
  danaTerkumpul: string;
  totalPencairan: number;
}) {
  const terkumpul = toNumber(danaTerkumpul);
  const sisaDana = terkumpul - totalPencairan;

  return (
    <>
      <Center>
        <Paper
          p={"md"}
          w={{ base: 200, sm: 200, md: 300, lg: 400 }}
          withBorder
          bg={"gray.2"}
        >
          <Stack spacing={0} align="center">
            <Text fw={"bold"}>Dana Tersisa</Text>
            <Title>
              {
                <ComponentAdminGlobal_TampilanRupiahDonasi
                  nominal={sisaDana}
                  fontSize={20}
                />
              }
            </Title>
          </Stack>
        </Paper>
      </Center>
    </>
  );
}

function FormView({
  donasiId,
  danaTerkumpul,
  totalPencairan,
  onSuccess,
}: {
  donasiId: string;
  danaTerkumpul: string;
  totalPencairan: number;
  onSuccess: (val: any) => void;
}) {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [images, setImages] = useState<any | null>();
  const [value, setValue] = useState({
    title: "",
    deskripsi: "",
    nilai: "",
  });
  const [nilaiNominal, setNilaiNominal] = useState(0);
  const [isOver, setIsOver] = useState(false);

  const terkumpul = toNumber(danaTerkumpul);
  const sisaDana = terkumpul - totalPencairan;

  return (
    <>
      <Center>
        <Paper p={"md"} w={{ base: 200, sm: 200, md: 300, lg: 400 }} withBorder>
          <Center mb={"lg"}>
            <Title order={5}>Form Pencairan Dana</Title>
          </Center>
          <Stack>
            <TextInput
              icon={<Text fw={"bold"}>Rp.</Text>}
              withAsterisk
              placeholder="0"
              label="Nominal"
              maxLength={sisaDana.toLocaleString().length}
              error={
                isOver ? (
                  <ComponentGlobal_ErrorInput text="Nominal melebihi sisa dana" />
                ) : (
                  ""
                )
              }
              value={value.nilai}
              onChange={(val) => {
                // const nilai = val.currentTarget.value;
                // const nilaiTypeNumber = toNumber(val.currentTarget.value);

                // if (nilaiTypeNumber > sisaDana) {
                //   console.log("lebih");
                // } else {
                //   console.log("kurang");
                // }

                const match = val.currentTarget.value
                  .replace(/\./g, "")
                  .match(/^[0-9]+$/);

                if (val.currentTarget.value === "")
                  return setValue({
                    ...value,
                    nilai: "",
                  });

                if (!match?.[0]) return null;

                const nilai = val.currentTarget.value.replace(/\./g, "");
                const target = Intl.NumberFormat("id-ID").format(+nilai);

                if (+nilai > sisaDana) {
                  setIsOver(true);
                } else {
                  setIsOver(false);
                }
                setNilaiNominal(+nilai);
                setValue({
                  ...value,
                  nilai: target,
                });
              }}
            />
            <TextInput
              withAsterisk
              placeholder="Masukan judul"
              label="Judul"
              maxLength={100}
              onChange={(val: any) => {
                setValue({
                  ...value,
                  title: val.target.value,
                });
              }}
            />
            <Textarea
              withAsterisk
              placeholder="Masukan deskripsi"
              label="Deskripsi"
              maxLength={300}
              onChange={(val: any) => {
                setValue({
                  ...value,
                  deskripsi: val.target.value,
                });
              }}
            />

            <ComponentDonasi_NotedBox informasi="Wajib menyertakan bukti transfer" />
            <Stack>
              <Center>
                <FileButton
                  onChange={async (files: any | null) => {
                    try {
                      const buffer = URL.createObjectURL(
                        new Blob([new Uint8Array(await files.arrayBuffer())])
                      );
                      // console.log(buffer, "ini buffer");
                      // console.log(files, " ini file");
                      setImages(buffer);
                      setFile(files);
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                  accept="image/png,image/jpeg"
                >
                  {(props) => (
                    <Button
                      {...props}
                      radius={"xl"}
                      variant="outline"
                      w={150}
                      leftIcon={<IconCamera />}
                      compact
                    >
                      Upload
                    </Button>
                  )}
                </FileButton>
              </Center>
              {images ? (
                <AspectRatio ratio={9 / 16}>
                  <Paper radius={"md"} withBorder>
                    <Image alt="Foto" src={images} />
                  </Paper>
                </AspectRatio>
              ) : (
                ""
              )}
            </Stack>
            <Button
              disabled={
                _.values(value).includes("") || file === null || isOver
                  ? true
                  : false
              }
              style={{ transition: "0.5s" }}
              radius={"xl"}
              mt={"lg"}
              onClick={() =>
                onSave({
                  router: router,
                  value: value,
                  donasiId: donasiId,
                  file: file as any,
                  nilaiNominal: nilaiNominal,
                  onSuccess1: (val: any) => onSuccess(val),
                })
              }
            >
              Simpan
            </Button>
          </Stack>
        </Paper>
      </Center>
    </>
  );
}

async function onSave({
  router,
  value,
  donasiId,
  file,
  nilaiNominal,

  onSuccess1,
}: {
  router: AppRouterInstance;
  value: any;
  donasiId: string;
  file: FormData;
  nilaiNominal: number;
  onSuccess1: (val: any) => void;
}) {
  const body = {
    donasiId: donasiId,
    nominalCair: nilaiNominal,
    title: value.title,
    deskripsi: value.deskripsi,
  };

  if (_.values(body).includes(""))
    return ComponentAdminGlobal_NotifikasiPeringatan("Lengkapi Data");
  if (!file)
    return ComponentAdminGlobal_NotifikasiPeringatan(
      "Lampirkan Bukti Transfer"
    );

  const gambar = new FormData();
  gambar.append("file", file as any);

  await AdminDonasi_funCreatePencairanDana(body as any, gambar).then(
    async (res) => {
      if (res.status === 200) {
        await AdminDonasi_AkumulasiPencairanById(
          body.donasiId as any,
          body.nominalCair as any
        ).then(async (res) => {
          if (res.status === 200) {
            const loadData = await AdminDonasi_getOneById(donasiId);
            onSuccess1(loadData);
            ComponentAdminGlobal_NotifikasiBerhasil(res.message);
          } else {
            ComponentAdminGlobal_NotifikasiGagal(res.message);
          }
        });
      } else {
        NotifGagal(res.message);
      }
    }
  );
}
