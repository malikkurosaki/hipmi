"use client"

import { Stack, Center, Box, Card, Spoiler, Divider, Text } from "@mantine/core";
import _ from "lodash";
import { MODEL_FORUM_KOMENTAR } from "../../model/interface";
import ComponentForum_KomentarAuthorNameOnHeader from "../komentar_component/komentar_author_header_name";

export default function ComponentForum_ListKomentarView({
  listKomentar,
  setKomentar,
  postingId,
  userLoginId,
}: {
  listKomentar: MODEL_FORUM_KOMENTAR[];
  setKomentar: any;
  postingId: string;
  userLoginId: string;
}) {
  return (
    <>
      <Stack>
        {_.isEmpty(listKomentar) ? (
          <Center>
            <Text fw={"bold"} fz={"xs"} c={"gray"}>
              Belum ada komentar
            </Text>
          </Center>
        ) : (
          <Box>
            <Center>
              <Text fz={"xs"} c={"gray"}>
                {" "}
                Komentar
              </Text>
            </Center>
            {listKomentar.map((e, i) => (
              <Card key={i} mt={"xs"}>
                <Card.Section>
                  <ComponentForum_KomentarAuthorNameOnHeader
                    authorName={e?.Author?.Profile?.name}
                    imagesId={e?.Author?.Profile?.imagesId}
                    tglPublish={e?.createdAt}
                    userId={e?.Author?.id}
                    komentarId={e?.id}
                    isMoreButton={true}
                    setKomentar={setKomentar}
                    postingId={postingId}
                    userLoginId={userLoginId}
                  />
                </Card.Section>
                <Card.Section sx={{ zIndex: 0 }} p={"sm"}>
                  <Stack spacing={"xs"}>
                    <Text fz={"sm"} lineClamp={4}>
                      {e.komentar ? (
                        <Spoiler
                          hideLabel="sembunyikan"
                          maxHeight={100}
                          showLabel="tampilkan"
                        >
                          <div
                            dangerouslySetInnerHTML={{ __html: e.komentar }}
                          />
                        </Spoiler>
                      ) : (
                        ""
                      )}
                    </Text>
                  </Stack>
                </Card.Section>
                <Card.Section>
                  <Stack>
                    <Divider />
                  </Stack>
                </Card.Section>
              </Card>
            ))}
          </Box>
        )}
      </Stack>
    </>
  );
}