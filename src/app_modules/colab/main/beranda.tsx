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

export default function Colab_Beranda() {
  const router = useRouter();
  const [scroll, scrollTo] = useWindowScroll();
  const [loadingCreate, setLoadingCreate] = useState(false);

  return (
    <>
      <Affix position={{ bottom: rem(100), right: rem(30) }}>
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

      {Array(5)
        .fill(0)
        .map((e, i) => (
          <Card key={i} withBorder shadow="lg" mb={"lg"} radius={"md"}>
            <ComponentColab_CardSectionHeaderAuthorName tglPublish={new Date} jumlah_partisipan={12} />
            <ComponentColab_CardSectionData
              colabId={i}
              path={RouterColab.main_detail}
            />
          </Card>
        ))}
    </>
  );
}
