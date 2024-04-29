"use client";

import { useEffect, useState } from "react";
import mqtt_client from "./mqtt_client";
import { useAtom } from "jotai";
import { gs_coba_chat } from "@/app/makuro/gs_coba";

export default function MqttLoader() {
  useEffect(() => {
    mqtt_client.on("connect", () => {
      console.log("connected");
    //   mqtt_client.subscribe("server12");
    });

    // mqtt_client.on("message", (apa) => {
    //   console.log("Ini yang di utils");
    // });
  }, []);
  return null;
}
