import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const gs_notifikasi_kategori_app = atomWithStorage(
  "gs_notifikasi_kategori_app",
  ""
);

// export const gs_notifikasi_page = atom<string>("");
