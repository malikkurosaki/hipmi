import { atomWithStorage } from "jotai/utils";
import { getProfile } from "..";

export const gs_profile = atomWithStorage<any | null>("gs_profile", null);


