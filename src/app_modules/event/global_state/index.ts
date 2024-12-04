import { atomWithStorage } from "jotai/utils";

/**
 * @param index | 0 - 3 | 0: Beranda, 1: Status, 2: Kontibusi, 3: Riwayat
 * @type number
 */
export const gs_event_hotMenu = atomWithStorage("gs_event_hotMenu", 0)

/**
 * @param status | "Publish", "Review", "Draft", "Reject"
 * @type string
 */
export const gs_event_status = atomWithStorage<string | any>("gs_status_event", "Publish")
