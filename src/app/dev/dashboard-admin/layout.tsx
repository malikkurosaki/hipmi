"use client";
import { PropsWithChildren, useState } from "react";
import {
  createStyles,
  Navbar,
  Group,
  Code,
  getStylesRef,
  rem,
  AppShell,
  useMantineTheme,
  Header,
  MediaQuery,
  Burger,
  Text,
  Button,
  Image,
  NavLink,
  Paper,
  Box,
} from "@mantine/core";
import { LuLayoutDashboard } from "react-icons/lu";
import { AiOutlineLogout, AiOutlineUsergroupAdd } from "react-icons/ai";
import { BsClipboardData, BsDatabaseCheck } from "react-icons/bs";
import { CiCircleCheck } from "react-icons/ci";
import { FiUser } from "react-icons/fi";
import { GiOrganigram } from "react-icons/gi";
import { MdOutlineAnnouncement } from "react-icons/md";
import { PiFolderSimpleUser, PiImage, PiUserList } from "react-icons/pi";
import {
  HiOutlineBriefcase,
  HiOutlineInformationCircle,
  HiOutlineNewspaper,
  HiOutlineShoppingCart,
  HiOutlineUserGroup,
} from "react-icons/hi";

const useStyles = createStyles((theme) => ({
  header: {
    paddingBottom: theme.spacing.md,
    marginBottom: `calc(${theme.spacing.md} * 1.5)`,
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,
  },

  footer: {
    paddingTop: theme.spacing.md,
    marginTop: theme.spacing.md,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,
  },

  link: {
    ...theme.fn.focusStyles(),
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    fontSize: theme.fontSizes.sm,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[1]
        : theme.colors.gray[7],
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,

      [`& .${getStylesRef("icon")}`]: {
        color: theme.colorScheme === "dark" ? theme.white : theme.black,
      },
    },
  },

  linkIcon: {
    ref: getStylesRef("icon"),
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[2]
        : theme.colors.gray[6],
    marginRight: theme.spacing.sm,
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: "#17594A",
      color: "white",
      [`& .${getStylesRef("icon")}`]: {
        color: "white",
      },
    },
  },
}));

const dashboard_aset = [
  {
    id: 1,
    link: "/dev/dashboard-admin",
    label: "Dashboard",
    icon: LuLayoutDashboard,
  },
  {
    id: 2,
    link: "/dev/dashboard-admin/data-aset",
    label: "Data Aset",
    icon: BsDatabaseCheck,
  },
];

const data_turunan = [
  {
    id: 1,
    name: "Data Struktur",
    icon: BsClipboardData,
    child: [
      {
        id: 1,
        label: "Konfirmasi User",
        icon: FiUser,
        link: "/dev/dashboard-admin/data-struktur/konfirmasi-user",
      },
      {
        id: 2,
        label: "Data Struktur Organisasi",
        icon: GiOrganigram,
        link: "/dev/dashboard-admin/data-struktur/data-struktur-organisasi",
      },
    ],
  },
  {
    id: 2,
    name: "Tentang Kami",
    icon: HiOutlineUserGroup,
    child: [
      {
        id: 1,
        link: "/dev/dashboard-admin/tentang-kami/halaman-sejarah",
        label: "Halaman Sejarah",
        icon: PiFolderSimpleUser,
      },
      {
        id: 2,
        link: "/dev/dashboard-admin/tentang-kami/halaman-visi-misi",
        label: "Halaman Visi Misi",
        icon: PiUserList,
      },
    ],
  },
  {
    id: 3,
    name: "informasi",
    icon: HiOutlineInformationCircle,
    child: [
      {
        id: 1,
        link: "/dev/dashboard-admin/informasi/halaman-berita",
        label: "Halaman Berita",
        icon: HiOutlineNewspaper,
      },
      {
        id: 2,
        link: "/dev/dashboard-admin/informasi/halaman-pengumuman",
        label: "Halaman Pengumuman",
        icon: MdOutlineAnnouncement,
      },
      {
        id: 3,
        link: "/dev/dashboard-admin/informasi/halaman-galeri",
        label: "Halaman Galeri",
        icon: PiImage,
      },
    ],
  },
];

export default function LayoutDashboardAdmin({ children }: PropsWithChildren) {
  const [active, setActive] = useState(0);
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  return (
    <AppShell
      styles={{
        main: {
          background: "#EEEDED",
          // theme.colorScheme === "dark"
          //   ? theme.colors.dark[8]
          //   : theme.colors.dark[9],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 200, lg: 300 }}
          bg={"white"}
        >
          <Navbar.Section>
          {dashboard_aset.map((e, i) => (
              <NavLink
                key={`${e.id}${i}`}
                label={e.label}
                icon={<e.icon size={20} />}
                component="a"
                href={e.link}
                c={e.label ? "#17594A" : "dark"}
                fw={e.label ? "bolder" : "normal"}
              />
            ))}
            {data_turunan.map((e, i) => (
              <NavLink
                key={`${e.id}${i}`}
                label={e.name}
                icon={<e.icon size={20} />}
                c={e.name ? "#17594A" : "dark"}
                fw={e.name ? "bolder" : "normal"}
              >
                {e.child.map((v, ii) => (
                  <Paper key={`${v.id}${ii}`}>
                    <NavLink
                      icon={<v.icon color={"#17594A"} />}
                      label={v.label}
                      // active={true}
                      c={v.label ? "#17594A" : "dark"}
                      component="a"
                      href={v.link}
                    />
                  </Paper>
                ))}
              </NavLink>
            ))}
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header
          height={{ base: 90, md: 90 }}
          p="md"
          style={{
            background: "#17594A",
          }}
        >
          <div
            style={{ display: "flex", alignItems: "center", height: "100%" }}
          >
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="md"
                color={theme.colors.gray[1]}
                mr="xl"
              />
            </MediaQuery>
            <Group position="apart">
              {/* <Text component="a" href="/" fw={700}  >
                Dashboard Admin
              </Text> */}
              <Image src="/img/logo_1.png" alt="logo" />
            </Group>
          </div>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
}
