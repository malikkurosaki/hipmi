import { Group, Text } from "@mantine/core";

export default function ComponentGlobal_TampilanAngkaRatusan({
  nominal,
  color,
  fontSize,
  fontWeight,
  textBefore,
  textAfter,
}: {
  nominal: number;
  color?: string;
  fontSize?: number | string;
  fontWeight?: string | number;
  textBefore?: string;
  textAfter?: string;
}) {
  return (
    <>
      <Group spacing={"xs"}>
        {textBefore ? (
          <Text
            fw={fontWeight ? fontWeight : "bold"}
            fz={fontSize ? fontSize : "md"}
          >
            {textBefore}
          </Text>
        ) : (
          ""
        )}
        <Text
          fw={fontWeight ? fontWeight : "bold"}
          fz={fontSize ? fontSize : "md"}
          style={{
            color: color ? color : "white",
          }}
        >
          {new Intl.NumberFormat("id-ID", { maximumFractionDigits: 10 }).format(
            nominal
          )}
        </Text>
        {textAfter ? (
          <Text
            fw={fontWeight ? fontWeight : "bold"}
            fz={fontSize ? fontSize : "md"}
          >
            {textAfter}
          </Text>
        ) : (
          ""
        )}
      </Group>
    </>
  );
}
