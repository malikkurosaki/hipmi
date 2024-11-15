import { AccentColor } from "@/app_modules/_global/color";
import { job_getAllListPublish } from "@/app_modules/job/fun/get/get_all_publish";
import { Center, Button, Affix, rem } from "@mantine/core";
import { useWindowScroll } from "@mantine/hooks";
import { useState } from "react";

export function Job_ComponentButtonUpdateBeranda({
  onSetData,
  onSetIsNewPost,
}: {
  onSetData: (val: any[]) => void;
  onSetIsNewPost: (val: any) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);

  async function onLoadNewData() {
    setIsLoading(true);
    const loadData = await job_getAllListPublish({ page: 1 });
    onSetData(loadData);
    onSetIsNewPost(false);
    setIsLoading(false);
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
            opacity={0.8}
            onClick={() => onLoadNewData()}
          >
            Update beranda
          </Button>
        </Center>
      </Affix>
    </>
  );
}
