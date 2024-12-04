import { atomWithStorage } from "jotai/utils";

/**
 * @param {number} key | 0 - 4
 * @type number
 */
export const gs_investas_menu = atomWithStorage<number>("changeColor", 0);

/**
 * @param key | "Publish", "Review", "Draft", "Reject"
 * @type string
 */
export const gs_investasi_status = atomWithStorage<any | string>(
  "gs_TabPortoInvestasi",
  "Publish"
);

export const gs_TransferValue = atomWithStorage("gs_TransferValue", {
  lembarTerbeli: "",
  totalTransfer: "",
  namaBank: "",
  nomorRekening: "",
});

export const gs_midtrans_snap = atomWithStorage(
  "gs_midtrans_snapssssssssss",
  false
);
