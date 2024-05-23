"use client";

import { RouterColab } from "@/app/lib/router_hipmi/router_colab";
import { RouterForum } from "@/app/lib/router_hipmi/router_forum";
import ComponentGlobal_AuthorNameOnHeader from "@/app_modules/component_global/author_name_on_header";
import {
  ActionIcon,
  Affix,
  Card,
  Center,
  Grid,
  Paper,
  Stack,
  Text,
  Textarea,
  Title,
  rem,
} from "@mantine/core";
import { useWindowScroll } from "@mantine/hooks";
import { IconPencilPlus } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ComponentColab_CardSectionData from "../component/card_view/card_section_data";
import ComponentColab_SectionHeaderAuthorName from "../component/card_view/card_section_header_author_name";
import ComponentGlobal_V2_LoadingPage from "@/app_modules/component_global/loading_page_v2";
import ComponentColab_CardSectionHeaderAuthorName from "../component/card_view/card_section_header_author_name";
import { MODEL_COLLABORATION } from "../model/interface";
import ComponentColab_JumlahPartisipan from "../component/card_view/card_section_jumlah_partisipan";

export default function Colab_Beranda({
  listData,
  userLoginId,
}: {
  listData: MODEL_COLLABORATION[];
  userLoginId: string;
}) {
  const router = useRouter();
  const [scroll, scrollTo] = useWindowScroll();
  const [loadingCreate, setLoadingCreate] = useState(false);

  return (
    <>
      <Affix position={{ bottom: rem(150), right: rem(30) }}>
        <ActionIcon
          loading={loadingCreate ? true : false}
          opacity={scroll.y > 0 ? 0.5 : ""}
          style={{
            transition: "0.5s",
          }}
          size={"xl"}
          radius={"xl"}
          variant="transparent"
          bg={"blue"}
          onClick={() => {
            setLoadingCreate(true);
            router.push(RouterColab.create);
          }}
        >
          <IconPencilPlus color="white" />
        </ActionIcon>
      </Affix>

      {/* <pre>{JSON.stringify(listData, null, 2)}</pre> */}

      {listData.map((e, i) => (
        <Card key={e.id} withBorder shadow="lg" mb={"sm"} radius={"md"}>
          <Stack>
            <ComponentColab_CardSectionHeaderAuthorName
              authorName={e?.Author?.Profile?.name}
              imagesId={e?.Author?.Profile?.imagesId}
              profileId={e?.Author?.Profile?.id}
              isAuthor={userLoginId === e.Author.id ? true : false}
              colabId={e.id}
            />
            <ComponentColab_CardSectionData
              colabId={e.id}
              path={RouterColab.main_detail}
              data={e}
            />
            <ComponentColab_JumlahPartisipan
              jumlah={e.ProjectCollaboration_Partisipasi}
            />
          </Stack>
        </Card>
      ))}
    </>
  );
}
