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
  Title
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

export function UiMap_CreatePin({
  mapboxToken,
  portofolioId,
}: {
  mapboxToken: string;
  portofolioId: string;
}) {
  const [[lat, long], setLatLong] = useState([0, 0]);
  const [isPin, setIsPin] = useState(false);
  const [namePin, setNamePin] = useState("");
  const [file, setFile] = useState<File | any>(null);
  const [img, setImg] = useState<any | null>(null);

  return (
    <>
      <Stack>
        <Map
          mapboxAccessToken={mapboxToken}
          mapStyle={"mapbox://styles/mapbox/streets-v11"}
          initialViewState={{
            latitude: defaultLatLong[0],
            longitude: defaultLatLong[1],
            zoom: defaultMapZoom,
          }}
          style={{
            cursor: "pointer",
            width: "100%",
            height: "60vh",
            borderRadius: "10px",
          }}
          onClick={(a) => {
            setLatLong([a.lngLat.lat, a.lngLat.lng]);
            setIsPin(true);
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
            latitude={lat}
            longitude={long}
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
            disabled={isPin ? false : true}
            style={{ transition: "0.5s" }}
            styles={{ label: { color: isPin ? "white" : "gray" } }}
            label="Nama Pin"
            placeholder="Masukan nama pin map"
            withAsterisk
            onChange={(val) => {
              setNamePin(_.startCase(val.currentTarget.value));
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
                  maw={200}
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
                <Box
                  h={250}
                  w={200}
                  style={{
                    color: "white",
                  }}
                >
                  <Stack spacing={5} justify="center" align="center" h={"100%"}>
                    <Title order={3}>Foto Lokasi Bisnis</Title>
                    <Text fs={"italic"} fz={10} align="center">
                      Upload foto lokasi bisnis anda untuk ditampilkan dalam
                      detail map
                    </Text>
                  </Stack>
                </Box>
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
                  disabled={isPin ? false : true}
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

        <ButtonSavePin
          namePin={namePin}
          lat={lat as any}
          long={long as any}
          portofolioId={portofolioId}
          file={file}
        />
      </Stack>
    </>
  );
}

function ButtonSavePin({
  namePin,
  lat,
  long,
  portofolioId,
  file,
}: {
  namePin: string;
  lat: string;
  long: string;
  portofolioId: string;
  file: FormData;
}) {
  const router = useRouter();
  async function onSavePin() {
    const gambar = new FormData();
    gambar.append("file", file as any);

    const res = await map_funCreatePin({
      data: { namePin, lat, long, portofolioId, gambar },
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
        disabled={namePin === "" || file === null ? true : false}
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
