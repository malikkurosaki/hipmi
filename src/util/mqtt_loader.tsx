"use client";

import { useEffect } from "react";
// import mqtt_client from "./mqtt_client";
// import { useAtom } from "jotai";
// import { gs_coba_chat } from "@/app/makuro/gs_coba";

// export default function MqttLoader() {
//   const [msg, setMsg] = useAtom(gs_coba_chat);
//   useEffect(() => {
//     mqtt_client.on("connect", () => {
//       console.log("connected");
//       mqtt_client.subscribe("example_hipmi");
//     });

//     mqtt_client.on("message", (apa, message) => {
//       console.log(message.toLocaleString());
//       setMsg(message.toLocaleString() as any);
//     });
//   }, [setMsg]);
//   return null;
// }
