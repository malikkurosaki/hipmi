import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const gs_investasiFooter = atomWithStorage<number>("changeColor", 0);
export const gs_StatusPortoInvestasi = atomWithStorage<any | string>(
  "gs_TabPortoInvestasi",
  "Draft"
);

export const gs_TransferValue = atomWithStorage("gs_TransferValue", {
  lembarTerbeli: "",
  totalTransfer: "",
  namaBank: "",
  nomorRekening: "",
});
