import { ComponentGlobal_CardStyles } from "@/app_modules/_global/component";
import { Box } from "@mantine/core";

export function ComponentGlobal_BoxUploadImage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ComponentGlobal_CardStyles height={300}>
        <Box
          style={{
            height: "100%",
            borderStyle: "dashed",
            borderRadius: "5px",
          }}
        >
          {children}
        </Box>
      </ComponentGlobal_CardStyles>
    </>
  );
}
