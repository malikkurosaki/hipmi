"use client";

import {
  AccentColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import {
  Button,
  Group,
  Image,
  Paper,
  Stack,
  TextInput
} from "@mantine/core";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Map, { Marker } from "react-map-gl";
import { map_funCreatePin } from "../fun/create/fun_create_pin";
import { defaultLatLong, defaultMapZoom } from "../lib/default_lat_long";

export function UiMap_CreatePin({ mapboxToken }: { mapboxToken: string }) {
  const [[lat, long], setLatLong] = useState([0, 0]);
  const [isPin, setIsPin] = useState(false);
  const [namePin, setNamePin] = useState("");

  return (
    <>
      <Stack style={{ borderRadius: "10px" }}>
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
          <Stack>
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
            <ButtonSavePin
              namePin={namePin}
              lat={lat as any}
              long={long as any}
            />
          </Stack>
        </Paper>
      </Stack>
    </>
  );
}

function ButtonSavePin({
  namePin,
  lat,
  long,
}: {
  namePin: string;
  lat: string;
  long: string;
}) {
  const router = useRouter();
  async function onSavePin() {
    const res = await map_funCreatePin({ data: { namePin, lat, long } });
    res.status === 200
      ? (ComponentGlobal_NotifikasiBerhasil(res.message), router.back())
      : ComponentGlobal_NotifikasiGagal(res.message);
  }

  return (
    <>
      <Group position="right">
        <Button
          style={{ transition: "0.5s" }}
          disabled={namePin === "" ? true : false}
          radius={"xl"}
          bg={MainColor.yellow}
          color="yellow"
          c={"black"}
          onClick={() => onSavePin()}
        >
          Simpan
        </Button>
      </Group>
    </>
  );
}
