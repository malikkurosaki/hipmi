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
} from "@mantine/core";
import { LuLayoutDashboard } from "react-icons/lu";
import { AiOutlineLogout, AiOutlineUsergroupAdd } from "react-icons/ai";
import { BsClipboardData, BsDatabaseCheck } from "react-icons/bs";
import { HiOutlineBriefcase, HiOutlineInformationCircle, HiOutlineShoppingCart, HiOutlineUserGroup } from "react-icons/hi";


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

const data = [
  { 
    link: "/dev/dashboard-admin", 
  label: "Dashboard", 
  icon: LuLayoutDashboard
},
  {
    link: "/dashboard/data_struktur",
    label: "Data Struktur",
    icon: BsClipboardData,
  },
  {
    link: "/dashboard/tentang_kami",
    label: "Tentang Kami",
    icon: HiOutlineUserGroup,
  },
  {
    link: "/dashboard/informasi",
    label: "Informasi",
    icon: HiOutlineInformationCircle,
  },
  {
    link: "/dashboard/data_aset",
    label: "Data Aset",
    icon: BsDatabaseCheck,
  },

];

export default function LayoutDashboardAdmin({ children }: PropsWithChildren) {
  const { classes, cx } = useStyles();
  const [active, setActive] = useState('Dashboard');
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  const links = data.map((item) => (
    <a
      className={cx(classes.link, {
        [classes.linkActive]: item.label === active,
      })}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} size={20} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <AppShell
      styles={{
        main: {
          background: "#EEEDED"
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
          <Navbar.Section grow>{links}</Navbar.Section>

          <Navbar.Section className={classes.footer}>
            <a href="/" className={classes.link}>
              <AiOutlineLogout className={classes.linkIcon} size={20} />
              <span onClick={() => {
              }}>Logout</span>
            </a>
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header height={{ base: 90, md: 90 }} p="md" style={{
          background: "#17594A"
        }}>
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
              <Image src="/img/logo_1.png" alt="logo"/>
            </Group>
          </div>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
}

