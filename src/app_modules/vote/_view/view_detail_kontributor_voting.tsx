import { RouterProfile } from "@/app/lib/router_hipmi/router_katalog";
import { AccentColor } from "@/app_modules/_global/color";
import { ComponentGlobal_AvatarAndAuthorName } from "@/app_modules/_global/component";
import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import {
  Card,
  Stack,
  Center,
  Title,
  Grid,
  Avatar,
  Badge,
  Divider,
  Text,
} from "@mantine/core";
import _ from "lodash";
import router from "next/router";
import { MODEL_VOTE_KONTRIBUTOR } from "../model/interface";

export function Voting_ViewDetailKontributorVoting({
  listKontributor,
}: {
  listKontributor: MODEL_VOTE_KONTRIBUTOR[];
}) {
  return (
    <>
      <Card
        p={30}
        style={{
          backgroundColor: AccentColor.darkblue,
          borderRadius: "10px",
          border: `2px solid ${AccentColor.blue}`,
          color: "white",
        }}
      >
        <Card.Section>
          {_.isEmpty(listKontributor) ? (
            <ComponentGlobal_IsEmptyData text="Tidak ada kontributor" />
          ) : (
            <Stack>
              {listKontributor?.map((e, i) => (
                <ComponentGlobal_AvatarAndAuthorName
                  key={e.id}
                  dataUser={e.Author}
                  componentRight={
                    <Badge w={130}>
                      <Text
                      lineClamp={1}
                        fz={e.Voting_DaftarNamaVote.value.length > 10 ? 8 : 10}
                      >
                        {e.Voting_DaftarNamaVote.value}
                      </Text>
                    </Badge>
                  }
                />
              ))}
            </Stack>
          )}
        </Card.Section>
      </Card>
    </>
  );
}
