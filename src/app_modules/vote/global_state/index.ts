import { atomWithStorage } from "jotai/utils";

export const gs_vote_hotMenu = atomWithStorage("gs_vote_hotMenu", 0);

export const gs_vote_status = atomWithStorage<string | any>(
  "gs_vote_status",
  "Publish"
);

export const gs_vote_riwayat = atomWithStorage<string | any>(
  "gs_vote_riwayat",
  "Semua"
);
