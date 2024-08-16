"use client";

import { AccentColor } from "@/app_modules/_global/color/color_pallet";
import { ComponentMap_DrawerDetailData } from "@/app_modules/map/_component";
import {
  defaultMapZoom
} from "@/app_modules/map/lib/default_lat_long";
import { MODEL_MAP } from "@/app_modules/map/lib/interface";
import { Image, Paper, Stack, Text, Title } from "@mantine/core";
import "mapbox-gl/dist/mapbox-gl.css";
import { useState } from "react";
import {
  AttributionControl,
  Map,
  Marker,
  NavigationControl,
  ScaleControl,
} from "react-map-gl";
import { ComponentPortofolio_DetailDataMap } from "../component";

export function Portofolio_UiMap({
  mapboxToken,
  data,
}: {
  mapboxToken: string;
  data: MODEL_MAP;
}) {
  return (
    <Paper
      p={"sm"}
      style={{
        backgroundColor: AccentColor.darkblue,
        border: `2px solid ${AccentColor.blue}`,
        borderRadius: "10px ",
        padding: "15px",
        color: "white",
      }}
    >
      <Stack spacing={0}>
        <Title mb={"lg"} order={6}>
          Lokasi Bisnis
        </Title>

        <MapView data={data} mapboxToken={mapboxToken} />
      </Stack>
    </Paper>
  );
}

function MapView({
  mapboxToken,
  data,
}: {
  mapboxToken: string;
  data: MODEL_MAP;
}) {
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <>
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
          height: "50vh",
          borderRadius: "10px",
        }}
        attributionControl={false}
        
      >
        <Marker
          style={{
            color: "red",
            width: 40,
            cursor: "pointer",
          }}
          latitude={data.latitude}
          longitude={data.longitude}
          anchor="bottom"
          offset={[0, 0]}
          scale={1}
          onClick={() => {
            setOpenDrawer(true);
          }}
          pitchAlignment="auto"
        >
          <Stack spacing={0} align="center">
            <Image
              w={"100%"}
              alt="image"
              src="https://cdn-icons-png.flaticon.com/512/5860/5860579.png"
            />

            <Text
              fz={"xs"}
              bg={"dark"}
              c={"white"}
              align="center"
              style={{
                borderRadius: "5px",
                padding: "5px",
                width: 50,
              }}
              lineClamp={2}
            >
              {data.namePin}
            </Text>
          </Stack>
        </Marker>

        <NavigationControl />
        <ScaleControl position="top-left" />
        <AttributionControl
          style={{ color: "black" }}
          customAttribution="Map design by PT. Bali Interaktif Perkasa"
        />
      </Map>

      <ComponentMap_DrawerDetailData
        opened={openDrawer}
        close={() => setOpenDrawer(false)}
        mapId={data.id}
        component={<ComponentPortofolio_DetailDataMap mapId={data.id} />}
      />
    </>
  );
}
// ComponentPortofolio_DetailDataMap;
