"use client";
import { WARNA } from "@/fun/color_tone";
import {
  Box,
  Flex,
  Button,
  Menu,
  Paper,
  createStyles,
  Text,
} from "@mantine/core";
import { useWindowScroll } from "@mantine/hooks";
import { IconCaretDown, IconLogin } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
const useStyles = createStyles((theme) => ({
  body_box: {
    transition: "1s ease",
  },

  text_header: {
    color: WARNA.hijau_tua,
    fontWeight: "normal",
    ":hover": {
      cursor: "pointer",
      color: WARNA.hijau_cerah,
      fontWeight: "bolder",
    },
  },

  hover_dropdown: {
    ":hover": {
      backgroundColor: "transparent",
      fontWeight: "bold",
      color: WARNA.hijau_muda,
    },
  },
}));

export function HeaderButton() {
  const { classes } = useStyles();
  const router = useRouter();
  const [scroll, scrollTo] = useWindowScroll();
  return (
    <>
      <Box className={classes.body_box}>
        <Flex gap={"60px"} align={"center"} h={50}>
          <Text
            className={classes.text_header}
            onClick={() => {
              
              scrollTo({ y: 0 });
            }}
          >
            Beranda
          </Text>
          {/* Button TENTANG KAMI */}
          <Menu
            trigger="hover"
            transitionProps={{
              transition: "scale-y",
              duration: 200,
            }}
            arrowPosition="side"
            withArrow
          >
            <Menu.Target>
              <Text
                className={classes.text_header}
               
              >
                Tentang Kami
              </Text>
            </Menu.Target>
            <Menu.Dropdown sx={{ borderRadius: 30 }}>
              <Paper w={200} p={5} radius={30}>
                <Menu.Item
                  className={classes.hover_dropdown}
                  onClick={() => scrollTo({ y: 500 })}
                >
                  Pengurus Organisasi
                </Menu.Item>
                <Menu.Item
                  className={classes.hover_dropdown}
                  onClick={() => scrollTo({ y: 800 })}
                >
                  Sejarah & VisiMisi
                </Menu.Item>
              </Paper>
            </Menu.Dropdown>
          </Menu>

          {/* Button INFORMASI */}
          <Menu
            trigger="hover"
            transitionProps={{
              transition: "scale-y",
              duration: 200,
            }}
            arrowPosition="side"
            withArrow
          >
            <Menu.Target>
              <Text
                className={classes.text_header}
              
              >
                Informasi
              </Text>
            </Menu.Target>
            <Menu.Dropdown sx={{ borderRadius: 30 }}>
              <Paper w={200} p={5} radius={30}>
                <Menu.Item
                  className={classes.hover_dropdown}
                  onClick={() => scrollTo({ y: 550 })}
                >
                  Pengumuman
                </Menu.Item>
                <Menu.Item className={classes.hover_dropdown}>Berita</Menu.Item>
              </Paper>
            </Menu.Dropdown>
          </Menu>

          {/* Button GALERI */}
          <Menu
            trigger="hover"
            transitionProps={{
              transition: "scale-y",
              duration: 200,
            }}
            arrowPosition="side"
            withArrow
          >
            <Menu.Target>
              <Text className={classes.text_header}>Galeri</Text>
            </Menu.Target>
            <Menu.Dropdown sx={{ borderRadius: 30 }}>
              <Paper w={200} p={5} radius={30}>
                <Menu.Item
                  className={classes.hover_dropdown}
                  onClick={() => scrollTo({ y: 450 })}
                >
                  Foto
                </Menu.Item>
                <Menu.Item className={classes.hover_dropdown}>Video</Menu.Item>
              </Paper>
            </Menu.Dropdown>
          </Menu>

          {/* Button Kontak */}
          <Text
            className={classes.text_header}
            onClick={() => scrollTo({ y: 1200 })}
          >
            Hubungi Kami
          </Text>

          {/* Button LOGIN */}
          <Menu position="bottom">
            <Menu.Target>
              <Button
                leftIcon={<IconLogin />}
                bg={WARNA.hijau_muda}
                color={"lime"}
                radius={30}
              >
                Login
              </Button>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item onClick={() => router.push("/dev/auth/login")}>
                Login
              </Menu.Item>
              <Menu.Item onClick={() => router.push("/dev/dashboard-admin")}>
                Dashboard Admin
              </Menu.Item>
              <Menu.Item
                onClick={() => router.push("/dev/dashboard-super-admin")}
              >
                Dashboard Super Admin
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Flex>
      </Box>
    </>
  );
}
