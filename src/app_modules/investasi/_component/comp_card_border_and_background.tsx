import { AccentColor } from "@/app_modules/_global/color";
import { Card } from "@mantine/core";
import React from "react";

export function Investasi_ComponentStylesCard({
  children,
  backgroundColor,
  border,
  marginBottom,
  onClickHandler,
}: {
  children: React.ReactNode;
  backgroundColor?: string;
  border?: string;
  marginBottom?: string | number;
  onClickHandler?: (val: any) => void;
}) {
  
  return (
    <>
      <Card
        style={{
          backgroundColor: backgroundColor
            ? backgroundColor
            : AccentColor.darkblue,
          border: `2px solid ${border ? border : AccentColor.blue}`,
          paddingInline: "20px",
          paddingTop: "15px",
          paddingBottom: "20px",
          borderRadius: "10px",
          color: "white",
          marginBottom: marginBottom ? marginBottom : "0x",
        }}
        onClick={onClickHandler}
      >
        {children}
      </Card>
    </>
  );
}
