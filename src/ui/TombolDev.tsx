import { Button } from "@mantine/core";
import { ButtonToogle } from "next-dev";

export function TombolDev() {
  return (
    <ButtonToogle>
      {(isDev) => (
        <Button color={isDev ? "blue" : "grape"}>
          {isDev ? "Development" : "Production"}
        </Button>
      )}
    </ButtonToogle>
  );
}
