"use client"

import ComponentGlobal_V2_LoadingPage from "@/app_modules/_global/loading_page_v2";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ComponentForum_MainCardView from "../component/main_card_view";
import { MODEL_FORUM_POSTING } from "../model/interface";
import ComponentForum_ForumkuMainCardView from "../component/forumku_component/forumku_view";

export default function ComponentForum_PostinganPribadi({
  dataPosting,
  userLoginId,
}: {
  dataPosting: MODEL_FORUM_POSTING[];
  userLoginId: any;
}) {
  const router = useRouter();
  const [data, setData] = useState(dataPosting);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [loadingKomen, setLoadingKomen] = useState(false);

//   if (loadingDetail) return <ComponentGlobal_V2_LoadingPage />;
//   if (loadingKomen) return <ComponentGlobal_V2_LoadingPage />;

  return (
    <>
    

      {/* <ComponentForum_MainCardView
        data={data}
        setLoadingKomen={setLoadingKomen}
        setLoadingDetail={setLoadingDetail}
        userLoginId={userLoginId}
        setData={setData}
      /> */}

      {/* <Stack>
        {dataPosting.map((e, i) => (
          <Card key={i}>
            <Card.Section>
              <ComponentForum_PostingAuthorNameOnHeader isMoreButton={true} />
            </Card.Section>
            <Card.Section
              sx={{ zIndex: 0 }}
              p={"sm"}
              onClick={() => {
                // console.log("halaman forum");
                setLoadingDetail(true);
                router.push(RouterForum.main_detail + i);
              }}
            >
              <Stack spacing={"xs"}>
                <Text fz={"sm"} lineClamp={4}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad,
                  vitae. Quisquam aspernatur, eius consequatur dicta repellendus
                  facere vero recusandae deleniti voluptas quod architecto,
                  tenetur totam excepturi rem nam iusto earum.
                </Text>
              </Stack>
            </Card.Section>
            <Card.Section>
              <Stack>
                <Group spacing={"xs"} px={"sm"}>
                  <ActionIcon
                    // loading={loadingKomen ? true : false}
                    variant="transparent"
                    sx={{ zIndex: 1 }}
                    onClick={() => {
                      setLoadingKomen(true);
                      router.push(RouterForum.komentar + i);
                    }}
                  >
                    <IconMessageCircle color="gray" size={25} />
                  </ActionIcon>
                  <Text c={"gray"}>1</Text>
                </Group>
                <Divider />
              </Stack>
            </Card.Section>
          </Card>
        ))}
      </Stack> */}
    </>
  );
}