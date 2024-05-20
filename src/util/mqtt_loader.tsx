"use client";

import { useEffect, useState } from "react";
import mqtt_client from "./mqtt_client";
import { useAtom } from "jotai";
import { gs_coba_chat } from "@/app/makuro/gs_coba";
import { evnPesan } from "./evn";

export default function MqttLoader() {
  useEffect(() => {
    mqtt_client.on("connect", () => {
      console.log("connected");
      mqtt_client.subscribe("pesan");
      // fetch("").then((res) => {
      //   mqtt_client.subscribe("pesan");
      // });
    });

    mqtt_client.on("message", (apa: any, itu: any) => {
      console.log(itu)
      evnPesan.emit("pesan", itu);
    });
  }, []);
  return null;
}
