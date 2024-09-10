import { AccentColor } from "@/app_modules/_global/color/color_pallet";
import { Affix, Button, Center, rem } from "@mantine/core";
import { useState } from "react";
import { investasi_funGetAllPublish } from "../../fun/get_all_investasi";
import { data } from "autoprefixer";

export function Investasi_ComponentButtonUpdateBeranda({
  onLoadData,
}: {
  onLoadData: (val: any) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);

  async function onLoaded() {
    try {
      await investasi_funGetAllPublish({ page: 1 });
    } catch (error) {
      console.log(error);
    } finally {
      const loadData = await investasi_funGetAllPublish({ page: 1 });

      onLoadData({
        data: loadData,
        isNewPost: false,
      });
    }

    setIsLoading(true);
  }

  return (
    <>
      <Affix position={{ top: rem(100) }} w={"100%"}>
        <Center>
          <Button
            style={{
              transition: "0.5s",
              border: `1px solid ${AccentColor.skyblue}`,
            }}
            bg={AccentColor.blue}
            loaderPosition="center"
            loading={isLoading ? true : false}
            radius={"xl"}
            onClick={() => onLoaded()}
          >
            Update beranda
          </Button>
        </Center>
      </Affix>
    </>
  );
}
