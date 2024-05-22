"use client";

import { Text } from "@mantine/core";
import { useState } from "react";

export default function ComponentGlobal_InputCountDown({
  maxInput,
  lengthInput,
}: {
  maxInput: number;
  lengthInput: number;
}) {
  return (
    <>
      <Text fz={"xs"} fs={"italic"} color="gray">
        {maxInput - lengthInput < 0 ? 0 : maxInput - lengthInput} /{" "}
        <Text span inherit c={maxInput - lengthInput < 0 ? "red" : ""} style={{transition: "0.5s"}}>
          {maxInput}
        </Text>
      </Text>
    </>
  );
}
