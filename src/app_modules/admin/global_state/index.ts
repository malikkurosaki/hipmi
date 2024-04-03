import { atomWithStorage } from "jotai/utils";

/**
 * @param index | 0 - 3 | 0: Main dahsboard, 1: Investasi, 2: Donasi, 3: Event
 * @type number
 * @
 */
export const gs_admin_hotMenu = atomWithStorage("gs_admin_hotMenu", 1)

export const gs_admin_subMenu = atomWithStorage<number | null>("gs_admin_subMenu",null)