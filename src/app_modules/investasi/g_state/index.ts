import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const gs_investas_menu = atomWithStorage<number>("changeColor", 0);
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
