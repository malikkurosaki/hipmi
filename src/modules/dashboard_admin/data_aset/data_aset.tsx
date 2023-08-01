"use client";
import {
  ActionIcon,
  Box,
  Button,
  Group,
  Paper,
  Table,
  Text,
  TextInput,
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsDatabaseCheck } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";
import TambahDataAset from "./tambah_data_aset";
import EditDataAset from "./edit_data_aset";
import HapusDataAset from "./hapus_data_aset";

const dataaset = [
  {
    id: 1,
    judul: "motor",
    isi: "vario ",
    foto: "foto.png",
    tanggal: "12-8-2023",
  },
  {
    id: 2,
    judul: "motor",
    isi: "vario ",
    foto: "foto.png",
    tanggal: "12-8-2023",
  },
  {
    id: 3,
    judul: "motor",
    isi: "vario ",
    foto: "foto.png",
    tanggal: "12-8-2023",
  },
  {
    id: 4,
    judul: "motor",
    isi: "vario ",
    foto: "foto.png",
    tanggal: "12-8-2023",
  },
];

export function DataAset() {
  //menunggu rendering client karena tampilan di mulai dirender pada server
  const [waiting, setWaiting] = useState(false);
  useShallowEffect(() => {
    if (window) setWaiting(true);
  }, []);

  if (!waiting) return <></>;

  const data = dataaset.map((dataasets) => (
    <tr key={dataasets.id}>
      <td>{dataasets.id}</td>
      <td>{dataasets.judul}</td>
      <td>{dataasets.isi}</td>
      <td>{dataasets.foto}</td>
      <td>{dataasets.tanggal}</td>
      <td>
        <Group position="center">
          <EditDataAset />
          <HapusDataAset/>
        </Group>
      </td>
    </tr>
  ));

  return (
    <>
      <Box>
        <Paper shadow="lg" radius="md" p="md">
          <Box>
            <Group>
              <BsDatabaseCheck size={25} color="#17594A" />
              <Text fw={"bold"} color="#17594A" fz={20}>
                DATA ASET
              </Text>
            </Group>
          </Box>
        </Paper>
        <Box pt={20}>
          <Group position="apart">
            <TextInput placeholder="Search" radius={"xl"} w={400} />
            <TambahDataAset />
          </Group>
        </Box>
        <Box>
          <Box pt={20}>
            <Table horizontalSpacing="xl" verticalSpacing="xs">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Judul</th>
                  <th>Isi</th>
                  <th>Foto</th>
                  <th>Tanggal</th>
                  <th>
                    <Text ta={"center"}>Aksi</Text>
                  </th>
                </tr>
              </thead>
              <tbody>{data}</tbody>
            </Table>
          </Box>
        </Box>
      </Box>
    </>
  );
}
