"use client";
import { NEW_RouterInvestasi } from "@/app/lib/router_hipmi/router_investasi";
import { AccentColor, MainColor } from "@/app_modules/_global/color";
import { MODEL_NEW_DEFAULT_MASTER } from "@/app_modules/model_global/interface";
import { Stack, Tabs } from "@mantine/core";
import { useParams, useRouter } from "next/navigation";
import { Investasi_ViewPortofolioNew } from "../../_view/main/portofolio/view_portofolio_new";

export function Investasi_UiPortofolioNew({ listStatus }: { listStatus: MODEL_NEW_DEFAULT_MASTER[] }) {
   const param = useParams<{ id: string }>();
   const router = useRouter();

   return (
      <>
         <Tabs
            variant="pills"
            radius="xl"
            defaultValue={param.id}
            styles={{
               tabsList: {
                  position: "sticky",
                  top: 0,
                  zIndex: 99,
               },
            }}
            value={param.id}
            onTabChange={(val: any) => {
               router.push(NEW_RouterInvestasi.portofolio({ id: val }));
            }}
         >
            <Stack>
               <Tabs.List grow mb={"xs"}>
                  {listStatus.map((e) => (
                     <Tabs.Tab
                        w={"20%"}
                        key={e.id}
                        value={e.id}
                        fw={"bold"}
                        style={{
                           transition: "ease 0.5s ",
                           backgroundColor:
                              param.id === e.id ? MainColor.yellow : AccentColor.blue,
                           color: param.id === e.id ? "black" : "white",
                        }}
                     >
                        {e.name}
                     </Tabs.Tab>
                  ))}
               </Tabs.List>

               <Investasi_ViewPortofolioNew />
            </Stack>
         </Tabs>
      </>
   );
}
