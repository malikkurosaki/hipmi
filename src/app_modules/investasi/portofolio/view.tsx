"use client"

import { AspectRatio, Box, Card, CardSection, Divider, Grid, Group, Image, Slider, Stack, Text, Title } from "@mantine/core"
import dataDummy from "../dummy/data_dummy.json"
import moment from "moment"
import { useRouter } from "next/navigation"
import { IconCircleCheck } from "@tabler/icons-react"


export default  function PortofolioInvestasi() {
    const router = useRouter()
    return<>
    
     {dataDummy.map((e) => (
        <Card key={e.id}  withBorder mb={"lg"} onClick={() => router.push(`/dev/investasi/porto_detail/${e.id}`)}>
          <CardSection p={"xs"}>
            <AspectRatio ratio={16 / 9}>
              {/* {e.imagesId ? (
                <Image alt="" src={`/api/investasi/gambar/${e.imagesId}`} />
              ) : (
                <Image alt="" src={"/aset/no-img.png"} />
              )} */}
                <Image alt="" src={"/aset/no-img.png"} />

            </AspectRatio>
          </CardSection>

          <CardSection p={"lg"}>
            <Box mt={"md"}>
              <Slider
                size={10}
                disabled
                labelAlwaysOn
                value={e.persentase}
                marks={
                  [
                    {value: e.persentase, label: e.persentase + `%`}
                  ]
                }
              />
              <Title order={4}>{e.title}</Title>
            </Box>
            <Box mt={"md"}>
              <Grid>
                <Grid.Col span={6}>
                  <Stack>
                    <Box>
                      <Text>Dana Dibutuhkan</Text>
                      <Text>Rp. {e.targetDana}</Text>
                    </Box>
                    <Box>
                      <Text>Harga Per Lembar</Text>
                      <Text>Rp. {e.hargaLembar}</Text>
                    </Box>
                  </Stack>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Stack>
                    <Box>
                      <Text>ROI</Text>
                      <Text>{e.roi}%</Text>
                    </Box>
                    <Box>
                      <Text>Total Lembar</Text>
                      <Text>{e.totalLembar}</Text>
                    </Box>
                  </Stack>
                </Grid.Col>
              </Grid>
            </Box>
          </CardSection>
          <Divider />
          <CardSection p={"md"}>
          {(() => {
              if (
                e.masterPencarianInvestorId -
                  moment(new Date()).diff(new Date(e.createdAt), "days") ===
                0
              ) {
                return (
                  <>
                    <Group position="right">
                    <IconCircleCheck/>
                    <Text>Selesai</Text>
                    </Group>
                  </>
                );
              } else {
                return<>
                <Group position="right" spacing={"xs"}>
                  <Text>Sisa waktu:</Text>
                  <Text>
                    {e.masterPencarianInvestorId -
                      moment(new Date()).diff(new Date(e.createdAt), "days")}
                  </Text>
                  <Text>Hari</Text>
                </Group>
                </>
              }
            })()}
          </CardSection>
        </Card>
      ))}
    </>
}