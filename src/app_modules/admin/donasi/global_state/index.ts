import { atomWithStorage } from "jotai/utils";

/**
 * @param index | 0 - 3 | 0: Main dahsboard, 1: Investasi, 2: Donasi, 3: Event
 * @type number
 * @
 */
export const gs_adminDonasi_hotMenu = atomWithStorage("gs_adminDonasi_hotMenu", 0)