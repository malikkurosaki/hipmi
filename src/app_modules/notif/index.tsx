"use client";
import { useShallowEffect } from "@mantine/hooks";
import io from "socket.io-client";
import { toast } from "react-toastify";
// const socket = io("https://io.wibudev.com");

export default function AppNotif() {
  // useShallowEffect(() => {
  //   socket.on("io", (data) => {
  //       console.log(JSON.stringify(data))
  //     if (data && data.id === "hipmi") {
  //       toast.success(data.data);
  //     }
  //   });
  // }, []);
  return <></>;
}
