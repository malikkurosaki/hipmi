import { atomWithStorage } from "jotai/utils";

export const gs_token = atomWithStorage<any | null>("gs_token", null);
