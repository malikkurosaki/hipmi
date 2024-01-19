import { atomWithStorage } from "jotai/utils";

export const gs_profile = atomWithStorage<any | null>("gs_profile", null);
export const gs_fotoProfile = atomWithStorage<any | null>("gs_fotoProfile" , null)


