import { AccentColor, MainColor } from "@/app_modules/_global/color";
import { MODEL_NEW_DEFAULT_MASTER } from "@/app_modules/model_global/interface";
import {
  Box,
  Button,
  Group,
  SimpleGrid,
  Space,
  Stack,
  Tabs,
} from "@mantine/core";
import { useAtom } from "jotai";
import { useState } from "react";
import { gs_investasi_status } from "../../g_state";
import { Investasi_ViewPortofolioPublish } from "./portofolio/view_portofolio_publish";
import { Investasi_ViewPortofolioReview } from "./portofolio/view_portofolio_review";
import { Investasi_ViewPortofolioDraft } from "./portofolio/view_portofolio_draft";
import { Investasi_ViewPortofolioReject } from "./portofolio/view_portofolio_reject";

export function Investasi_ViewPortofolio({
  listStatus,
  listDataPublish,
  listDataReview,
  listDataDraft,
  listDataReject,
}: {
  listStatus: any[];
  listDataPublish: any[];
  listDataReview: any[];
  listDataDraft: any[];
  listDataReject: any[];
}) {
  const [activeTab, setActiveTab] = useAtom(gs_investasi_status);
  const [activeStatus, setActiveStatus] =
    useState<MODEL_NEW_DEFAULT_MASTER[]>(listStatus);

  // return (
  //   <>
  //     <Box h={"82vh"}>
  //       <Group grow h={"5vh"}>
  //         {activeStatus.map((e) => (
  //           <Box

  //           // component={Button}
  //             // radius={"xl"}
  //             key={e.id}
  //             // onClick={() => setActiveTab(e.name)}
  //             style={{
  //               alignContent: "center",
  //               justifyContent: "center",
  //               transition: "0.5s",
  //               backgroundColor:
  //                 activeTab === e.name ? MainColor.yellow : "gray",
  //               border:
  //                 activeTab === e.name ? `1px solid ${AccentColor.yellow}` : "",
  //               color: activeTab === e.name ? "black" : "white",
  //             }}
  //           >
  //             {e.name}
  //           </Box>
  //         ))}
  //       </Group>
  //       <Space h={"1vh"} />
  //       <Box h={"76vh"}>
  //         {activeTab === "Publish" && (
  //           <Investasi_ViewPortofolioPublish listData={listDataPublish} />
  //         )}

  //         {activeTab === "Review" && <Investasi_ViewPortofolioReview />}
  //       </Box>
  //     </Box>
  //   </>
  // );

  return (
    <>
      <Tabs
        variant="pills"
        radius="xl"
        defaultValue={activeTab}
        value={activeTab}
        onTabChange={setActiveTab}
        styles={{
          tabsList: {
            // backgroundColor: MainColor.black,
            position: "sticky",
            top: 0,
            zIndex: 99,
          },
        }}
      >
        <Stack>
          <Tabs.List grow mb={"xs"}>
            {activeStatus.map((e) => (
              <Tabs.Tab
                w={"20%"}
                key={e.id}
                value={e.name}
                fw={"bold"}
                style={{
                  transition: "ease 0.5s ",
                  backgroundColor:
                    activeTab === e.name ? MainColor.yellow : AccentColor.blue,
                  // border:
                  //   activeTab === e.name
                  //     ? `1px solid ${AccentColor.yellow}`
                  //     : "",

                  color: activeTab === e.name ? "black" : "white",
                }}
              >
                {e.name}
              </Tabs.Tab>
            ))}
          </Tabs.List>

          <Tabs.Panel value="Publish">
            <Investasi_ViewPortofolioPublish listData={listDataPublish} />
          </Tabs.Panel>

          <Tabs.Panel value="Review">
            <Investasi_ViewPortofolioReview listData={listDataReview} />
          </Tabs.Panel>

          <Tabs.Panel value="Draft">
            <Investasi_ViewPortofolioDraft listData={listDataDraft} />
          </Tabs.Panel>

          <Tabs.Panel value="Reject">
            <Investasi_ViewPortofolioReject listData={listDataReject} />
          </Tabs.Panel>
        </Stack>
      </Tabs>
    </>
  );
}
