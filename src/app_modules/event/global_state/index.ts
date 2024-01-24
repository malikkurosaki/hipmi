import { atomWithStorage } from "jotai/utils";

export const gs_event_hotMenu = atomWithStorage("gs_event_hotMenu", 0)

/**
 * @param status | "Publish", "Review", "Draft", "Reject"
 * @type string
 */
export const gs_event_status = atomWithStorage<string | any>("gs_status_event", "Publish")