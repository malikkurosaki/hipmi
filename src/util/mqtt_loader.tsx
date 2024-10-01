"use client";

import { useEffect } from "react";
import mqtt_client from "./mqtt_client";

export default function MqttLoader() {
  useEffect(() => {
    mqtt_client.on("connect", () => {
      console.log("connected");
    });
  }, []);

  return null;

  //   <>
  //     <Stack>
  //       <Button onClick={onClick}>Tekan</Button>
  //       <Button onClick={onClick2}>Tekan 2</Button>
  //     </Stack>
  //   </>
  // );
}
