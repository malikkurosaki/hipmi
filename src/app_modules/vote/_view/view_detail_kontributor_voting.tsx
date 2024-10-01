import {
  ComponentGlobal_AvatarAndUsername,
  ComponentGlobal_CardStyles,
} from "@/app_modules/_global/component";
import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import { Badge, Group, Stack, Text } from "@mantine/core";
import _ from "lodash";
import { MODEL_VOTE_KONTRIBUTOR } from "../model/interface";

export function Voting_ViewDetailKontributorVoting({
  listKontributor,
}: {
  listKontributor: MODEL_VOTE_KONTRIBUTOR[];
}) {
  return (
    <>
      <ComponentGlobal_CardStyles>
        {_.isEmpty(listKontributor) ? (
          <ComponentGlobal_IsEmptyData text="Tidak ada kontributor" />
        ) : (
          <Stack spacing={"lg"}>
            {listKontributor?.map((e, i) => (
              <ComponentGlobal_AvatarAndUsername
                key={e.id}
                profile={e.Author.Profile as any}
                component={
                  <Group position="right">
                    <Badge w={130}>
                      <Text
                        lineClamp={1}
                        fz={e.Voting_DaftarNamaVote.value.length > 10 ? 8 : 10}
                      >
                        {e.Voting_DaftarNamaVote.value}
                      </Text>
                    </Badge>
                  </Group>
                }
              />
            ))}
          </Stack>
        )}
      </ComponentGlobal_CardStyles>
    </>
  );
}
