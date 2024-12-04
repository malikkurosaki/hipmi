import { AccentColor } from "@/app_modules/_global/color/color_pallet";
import { Affix, rem, Center, Button } from "@mantine/core";
import { useState } from "react";
import colab_getListAllProyek from "../../fun/get/get_list_all_proyek";

export function ComponentColab_ButtonUpdateBeranda({
  onLoad,
  setIsNewPost,
}: {
  onLoad: (val: any) => void;
  setIsNewPost: any;
}) {
  const [isLoading, setIsLoading] = useState(false);

  async function onLoadData() {
    const loadData = await colab_getListAllProyek({ page: 1 });
    onLoad(loadData);
    setIsNewPost(false);
  }

  return (
    <>
      <Affix position={{ top: rem(70) }} w={"100%"}>
        <Center>
          <Button
            style={{
              transition: "0.5s",
              border: `1px solid ${AccentColor.skyblue}`,
              backgroundColor: AccentColor.softblue,
            }}
            loaderPosition="center"
            loading={isLoading ? true : false}
            radius={"xl"}
            opacity={0.8}
            onClick={() => {
              onLoadData();
            }}
          >
            Update Beranda
          </Button>
        </Center>
      </Affix>
    </>
  );
}
