import { atomWithStorage } from "jotai/utils";

export const gs_colab_hot_menu = atomWithStorage<number>(
  "gs_colab_hot_menu",
  1
);
export const gs_colab_status = atomWithStorage<string | any>(
  "gs_colab_status",
  "Publish"
);
export const gs_colab_proyek = atomWithStorage<string | any>(
  "gs_colab_proyek",
  "Partisipasi"
);
export const gs_colab_pesan = atomWithStorage<string | any>(
  "gs_colab_pesan",
  ""
);
