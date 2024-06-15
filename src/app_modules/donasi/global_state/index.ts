import { atomWithStorage } from "jotai/utils";

/**
 * @param index 0 - 2
 * @returns global state hot menu donasi
 */
export const gs_donasi_hot_menu = atomWithStorage("gs_donasi_hot_menu", 0);

/**
 * @param status - Publish, Review,, Draft, Reject
 * @type string
 * @returns status tabs pada posting
 */
export const gs_donasi_tabs_posting = atomWithStorage<string | null>(
  "gs_donasi_tabs_posting",
  "Publish"
);

export const gs_proses_donasi = atomWithStorage("gs_nomi", {
  nominal: "",
  bank: "",
  norek: "",
});
