import { atomWithStorage } from "jotai/utils";

export const gs_admin_navbar_menu = atomWithStorage<string>(
  "gs_admin_navbar_menu",
  "Main"
);

export const gs_admin_navbar_subMenu = atomWithStorage<string | null>(
  "gs_admin_navbar_submenu",
  null
);

export const gs_admin_navbar_isActive_dropdown = atomWithStorage<boolean>(
  "gs_admin_navbar_isActive_dropdown",
  false
);
