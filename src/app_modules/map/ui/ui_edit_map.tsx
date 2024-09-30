"use client";

import { RouterPortofolio } from "@/app/lib/router_hipmi/router_katalog";
import { RouterMap } from "@/app/lib/router_hipmi/router_map";
import {
  AccentColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";
import ComponentGlobal_BoxInformation from "@/app_modules/_global/component/box_information";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global/notifikasi_peringatan";
import {
  AspectRatio,
  Avatar,
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
import { useRouter } from "next/navigation";
import { useState } from "react";
import Map, {
  AttributionControl,
  Marker,
  NavigationControl,
  ScaleControl,
} from "react-map-gl";
import { map_funEditMap } from "../fun/edit/fun_edit_map";
import { defaultMapZoom } from "../lib/default_lat_long";
import { MODEL_MAP } from "../lib/interface";
import { APIs } from "@/app/lib";
import {
  ComponentGlobal_BoxUploadImage,
  ComponentGlobal_LoadImage,
} from "@/app_modules/_global/component";
import { ComponentMap_ButtonUpdateDataMap } from "../_component";

export function UiMap_EditMap({
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
      <Stack spacing={30} px={"sm"}>
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
            <Avatar
              src={
                data.pinId === null
                  ? APIs.GET({ fileId: dataMap.Portofolio.logoId })
                  : APIs.GET({ fileId: data.pinId })
              }
              alt="Logo"
              style={{
                border: `2px solid ${AccentColor.softblue}`,
                backgroundColor: "white",

                borderRadius: "100%",
              }}
            />
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

        {/* Photo Usaha */}
        <Stack spacing={"xs"}>
          <ComponentGlobal_BoxInformation informasi="Masukan photo toko atau tempat usaha anda !" />

          <ComponentGlobal_BoxUploadImage>
            {img ? (
              <AspectRatio ratio={1 / 1} mt={5} maw={300} mx={"auto"}>
                <Image style={{ maxHeight: 250 }} alt="Avatar" src={img} />
              </AspectRatio>
            ) : (
              <ComponentGlobal_LoadImage maw={300} fileId={data.imageId} />
            )}
          </ComponentGlobal_BoxUploadImage>

          {/* {img ? (
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
                  alt="Photo"
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
                  alt="Photo"
                  src={RouterMap.api_foto + data.imageId}
                  maw={250}
                />
              </Paper>
            </AspectRatio>
          )} */}

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

        <ComponentMap_ButtonUpdateDataMap data={data as any} file={file} />
      </Stack>
    </>
  );
}
