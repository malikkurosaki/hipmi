import { atomWithStorage } from "jotai/utils";
import { IAdmin_ActiveChildId, IAdmin_ActivePage } from "../notifikasi/route_setting/type_of_select_page";

export const gs_admin_navbar_menu = atomWithStorage<IAdmin_ActivePage | null>(
  "gs_admin_navbar_menu",
  "Main"
);

export const gs_admin_navbar_subMenu = atomWithStorage<IAdmin_ActiveChildId | string>(
  "gs_admin_navbar_submenu",
  ""
);

export const gs_admin_navbar_isActive_dropdown = atomWithStorage<boolean>(
  "gs_admin_navbar_isActive_dropdown",
  false
);
