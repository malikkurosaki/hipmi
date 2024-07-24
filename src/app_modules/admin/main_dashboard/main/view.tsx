"use client";

import {
  Divider,
  Grid,
  Group,
  Paper,
  Stack,
  Text,
  Title
} from "@mantine/core";


export default function AdminMain({countUser, countPorto}: {countUser: number, countPorto: number} ) {
  const listBox = [
    {
      id: 1,
      name: "User",
      jumlah: countUser,
      link: "",
      color: "green",
    },
    {
      id: 2,
      name: "Portofolio",
      jumlah: countPorto,
      link: "",
      color: "orange",
    },
  ];

  return (
    <>
      <Stack spacing={"sm"}>
        <Title>Main Dashboard</Title>
        <Divider mb={"md"} />
        {/* <Stack align="center" justify="center" h={"80vh"}>
          <Title>Cooming Soon !!</Title>
        </Stack> */}

        <Grid>
          {listBox.map((e) => (
            <Grid.Col md={4} lg={4} key={e.id}>
              <Paper
                withBorder
                // bg={`${e.color}.2`}
                shadow="md"
                radius="md"
                p="md"
                //   sx={{ borderColor: e.color, borderStyle: "solid" }}
              >
                <Group position="center">
                  <Stack align="center" spacing={0}>
                    <Text>{e.name}</Text>
                    <Title>{e.jumlah}</Title>
                  </Stack>
                </Group>
              </Paper>
            </Grid.Col>
          ))}

          <Grid.Col md={4} lg={4}>
            {/* <PieChart /> */}
          </Grid.Col>
        </Grid>
      </Stack>
    </>
  );
}

// const PieChart = () => {
//   const option: echarts.EChartsOption = {
//     title: {},
//     tooltip: {
//       trigger: "item",
//     },
//     legend: {
//       top: "bottom",
//     },
//     series: [
//       {
//         name: "Anggota Partai",
//         type: "pie",
//         bottom: "40",
//         data: [
//           { value: 10, name: "Laki-Laki" },
//           { value: 20, name: "Perempuan" },
//         ],
//       },
//     ],
//   };

//   return (
//     <>
//       <Box
//         sx={{
//           backgroundColor: "gray",
//         }}
//       >
//         <Text ta={"center"} fz={20} fw={700}>
//           Jenis Kelamin
//         </Text>
//         <EChartsReact style={{ height: 300 }} option={option} />
//       </Box>
//     </>
//   );
// };
