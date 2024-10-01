"use client";
import { useShallowEffect } from "@mantine/hooks";
import { useState } from "react";

export default function Page() {
  const [origin, setOrigin] = useState("");
  useShallowEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
  }, []);
  return <div>{origin}</div>;
}
