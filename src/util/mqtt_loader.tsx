"use client";

import { useEffect, useState } from "react";
import mqtt_client from "./mqtt_client";
import { useAtom } from "jotai";
import { gs_coba_chat } from "@/app/makuro/gs_coba";
import { evnPesan } from "./evn";
import { Button, Stack } from "@mantine/core";

export default function MqttLoader() {
  useEffect(() => {
    mqtt_client.on("connect", () => {
      try {
        console.log("connected");
      } catch (error) {
        console.log(error)
      };
      mqtt_client.subscribe("pesan");
      mqtt_client.subscribe("pesan2");

      // fetch("").then((res) => {
      //   mqtt_client.subscribe("pesan");
      // });
    });

    mqtt_client.on("message", (topic: any, message: any) => {
      // console.log(itu)
      // evnPesan.emit("pesan", itu);
      const data = JSON.parse(message.toString());

      if (data) {
        if (data.id === "1") {
          console.log("ini untuk id satu", data.data);
        }
      }
    });
  }, []);

  const onClick = async () => {
    mqtt_client.publish("pesan2", "apa pesannya 2");
  };

  const onClick2 = () => {
    mqtt_client.publish(
      "pesan",
      JSON.stringify({
        id: "2",
        title: "donasi",
        data: "databta",
      })
    );
  };
  return null
  //  (
  //   <Stack>
  //     <Button onClick={onClick}>Tekan</Button>
  //     <Button onClick={onClick2}>Tekan 2</Button>
  //   </Stack>
  // );
}
