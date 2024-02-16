import { RouterAdminEvent } from "@/app/lib/router_admin/router_admin_event";
import { RouterAdminVote } from "@/app/lib/router_admin/router_admin_vote";
import {
  RouterAdminDashboard,
  RouterAdminDonasi,
  RouterAdminInvestasi,
} from "@/app/lib/router_hipmi/router_admin";

export const listAdminPage = [
  {
    id: 1,
    name: "Main Dashboard",
    path: RouterAdminDashboard.main_admin,
    child: [],
  },
  {
    id: 2,
    name: "Investasi",
    path: RouterAdminInvestasi.main_investasi,
    child: [],
  },
  {
    id: 3,
    name: "Donasi",
    path: RouterAdminDonasi.main_donasi,
    child: [],
  },
  {
    id: 4,
    name: "Event",
    path: "",
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
];
