"use client";

import {
  AccentColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global/notifikasi_peringatan";
import {
  AspectRatio,
  Box,
  Button,
  Center,
  FileButton,
  Image,
  Paper,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { IconCamera } from "@tabler/icons-react";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Map, {
  AttributionControl,
  Marker,
  NavigationControl,
  ScaleControl,
} from "react-map-gl";
import { map_funCreatePin } from "../fun/create/fun_create_pin";
import { defaultLatLong, defaultMapZoom } from "../lib/default_lat_long";
import { MODEL_MAP } from "../lib/interface";
import { RouterMap } from "@/app/lib/router_hipmi/router_map";
import { map_funEditMap } from "../fun/edit/fun_edit_map";

export function UiMap_EditPin({
  mapboxToken,
  dataMap,
}: {
  mapboxToken: string;
  dataMap: MODEL_MAP;
}) {
  const [data, setData] = useState(dataMap);
  const [file, setFile] = useState<File | any>(null);
  const [img, setImg] = useState<any | null>(null);


  return (
    <>
      <Stack>
        <Map
          mapboxAccessToken={mapboxToken}
          mapStyle={"mapbox://styles/mapbox/streets-v11"}
          initialViewState={{
            latitude: data.latitude,
            longitude: data.longitude,
            zoom: defaultMapZoom,
          }}
          style={{
            cursor: "pointer",
            width: "100%",
            height: "60vh",
            borderRadius: "10px",
          }}
          onClick={(a) => {
            setData({
              ...data,
              latitude: a.lngLat.lat,
              longitude: a.lngLat.lng,
            });
          }}
          attributionControl={false}
        >
          <Marker
            style={{
              color: "red",
              width: 40,
              // height: 40,
              cursor: "pointer",
            }}
            latitude={data.latitude}
            longitude={data.longitude}
            anchor="bottom"
          >
            <Stack spacing={0}>
              <Image
                w={"100%"}
                alt="image"
                src="https://cdn-icons-png.flaticon.com/512/5860/5860579.png"
              />
            </Stack>
          </Marker>
          <NavigationControl />
          <ScaleControl position="top-left" />
          <AttributionControl customAttribution="Map design by PT. Bali Interaktif Perkasa" />
        </Map>

        <Paper
          style={{
            padding: "15px",
            backgroundColor: AccentColor.darkblue,
            border: `2px solid ${AccentColor.blue}`,
            borderRadius: "10px",
            color: "white",
          }}
        >
          <TextInput
            style={{ transition: "0.5s" }}
            styles={{ label: { color: "white" } }}
            label="Nama Pin"
            placeholder="Masukan nama pin map"
            value={data.namePin}
            withAsterisk
            onChange={(val) => {
              setData({
                ...data,
                namePin: val.currentTarget.value,
              });
            }}
          />
        </Paper>

        <Stack>
          {img ? (
            <AspectRatio ratio={1 / 1} mah={300}>
              <Paper
                style={{
                  border: `2px solid ${AccentColor.blue}`,
                  backgroundColor: AccentColor.darkblue,
                  padding: "10px",
                  borderRadius: "10px",
                }}
              >
                <Image
                  radius={"sm"}
                  alt="Foto"
                  src={img ? img : "/aset/no-img.png"}
                  maw={250}
                />
              </Paper>
            </AspectRatio>
          ) : (
            <AspectRatio ratio={1 / 1} mah={300}>
              <Paper
                style={{
                  border: `2px solid ${AccentColor.blue}`,
                  backgroundColor: AccentColor.darkblue,
                  padding: "10px",
                  borderRadius: "10px",
                }}
              >
                <Image
                  radius={"sm"}
                  alt="Foto"
                  src={RouterMap.api_foto + data.imagesId}
                  maw={250}
                />
              </Paper>
            </AspectRatio>
          )}

          <Center>
            <FileButton
              onChange={async (files: any | null) => {
                try {
                  const buffer = URL.createObjectURL(
                    new Blob([new Uint8Array(await files.arrayBuffer())])
                  );
                  if (files.size > 2000000) {
                    ComponentGlobal_NotifikasiPeringatan(
                      "Maaf, Ukuran file terlalu besar, maximum 2mb",
                      3000
                    );
                  } else {
                    setImg(buffer);
                    setFile(files);
                  }
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
                  leftIcon={<IconCamera />}
                  bg={MainColor.yellow}
                  color="yellow"
                  c={"black"}
                >
                  Upload
                </Button>
              )}
            </FileButton>
          </Center>
        </Stack>

        <ButtonSavePin data={data as any} file={file} />
      </Stack>
    </>
  );
}

function ButtonSavePin({ data, file }: { data: MODEL_MAP; file: FormData }) {
  const router = useRouter();
  async function onSavePin() {
    const gambar = new FormData();
    gambar.append("file", file as any);

    const res = await map_funEditMap({
      data: data,
      file: gambar

    });
    res.status === 200
      ? (ComponentGlobal_NotifikasiBerhasil(res.message), router.back())
      : ComponentGlobal_NotifikasiGagal(res.message);
  }

  return (
    <>
      <Button
        mt={"xl"}
        style={{ transition: "0.5s" }}
        disabled={data.namePin === "" ? true : false}
        radius={"xl"}
        bg={MainColor.yellow}
        color="yellow"
        c={"black"}
        onClick={() => onSavePin()}
      >
        Simpan
      </Button>
    </>
  );
}
