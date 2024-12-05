'use client'
import { Stack } from "@mantine/core";
import ProfileDetail from "./ui/profile_detail";
import ListPortofolioProfileNew from "./ui/list_portolio_new";

export default function ViewKatalogNew() {
   return (
      <>
         <Stack mb={"lg"}>
            <ProfileDetail />
            {/* <Portofolio_UiListView
               listPorto={listPorto as any}
               profile={profile}
               userLoginId={userLoginId}
            /> */}
            <ListPortofolioProfileNew />
         </Stack>
      </>
   )
}