import { atomWithStorage } from "jotai/utils";

/**
 * @param 1: Beranda, 2: Status, 3: Arsip
 * @returns halaman pada layout
 */
export const gs_job_hot_menu = atomWithStorage("gs_jobs_hot_menu", 1);
