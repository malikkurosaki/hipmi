import { RouterAdminEvent } from "@/app/lib/router_admin/router_admin_event";
import { RouterAdminJob } from "@/app/lib/router_admin/router_admin_job";
import { RouterAdminVote } from "@/app/lib/router_admin/router_admin_vote";
import {
  RouterAdminDashboard,
  RouterAdminDonasi,
  RouterAdminInvestasi,
} from "@/app/lib/router_hipmi/router_admin";
import { IconBriefcase } from "@tabler/icons-react";
import {
  IconHeartHandshake,
  IconHome,
  IconMoneybag,
  IconPackageImport,
  IconPresentation,
} from "@tabler/icons-react";

export const listAdminPage = [
  {
    id: 1,
    name: "Main Dashboard",
    path: RouterAdminDashboard.main_admin,
    icon: <IconHome />,
    child: [],
  },
  {
    id: 2,
    name: "Investasi",
    path: RouterAdminInvestasi.main_investasi,
    icon: <IconMoneybag />,

    child: [],
  },
  {
    id: 3,
    name: "Donasi",
    path: RouterAdminDonasi.main_donasi,
    icon: <IconHeartHandshake />,
    child: [],
  },
  {
    id: 4,
    name: "Event",
    path: "",
    icon: <IconPresentation />,
    child: [
      {
        id: 41,
        name: "Dashboard",
        path: RouterAdminEvent.main_event,
      },
      {
        id: 42,
        name: "Table Publish",
        path: RouterAdminEvent.table_publish,
      },
      {
        id: 43,
        name: "Table Review",
        path: RouterAdminEvent.table_review,
      },
      {
        id: 44,
        name: "Table Reject",
        path: RouterAdminEvent.table_reject,
      },
      {
        id: 45,
        name: "Tipe Acara",
        path: RouterAdminEvent.detail_tipe_acara,
      },
      {
        id: 6,
        name: "Riwayat",
        path: RouterAdminEvent.detail_riwayat,
      },
    ],
  },
  {
    id: 5,
    name: "Voting",
    path: "",
    icon: <IconPackageImport />,
    child: [
      {
        id: 51,
        name: "Dashboard",
        path: RouterAdminVote.main,
      },
      {
        id: 52,
        name: "Table Publish",
        path: RouterAdminVote.table_publish,
      },
      {
        id: 53,
        name: "Table Review",
        path: RouterAdminVote.table_review,
      },
      {
        id: 54,
        name: "Table Reject",
        path: RouterAdminVote.table_reject,
      },
      {
        id: 55,
        name: "Riwayat",
        path: RouterAdminVote.riwayat,
      },
    ],
  },
  {
    id: 6,
    name: "Job Vacancy",
    path: "",
    icon: <IconBriefcase />,
    child: [
      {
        id: 61,
        name: "Dashboard",
        path: RouterAdminJob.main,
      },
      {
        id: 62,
        name: "Table Publish",
        path: RouterAdminJob.table_publish,
      },
      {
        id: 63,
        name: "Table Review",
        path: RouterAdminJob.table_review,
      },
      {
        id: 64,
        name: "Table Reject",
        path: RouterAdminJob.table_reject,
      },
      {
        id: 65,
        name: "Arsip",
        path: RouterAdminJob.arsip,
      },
    ],
  },
];
