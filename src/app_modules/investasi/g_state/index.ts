import { atomWithStorage } from "jotai/utils";

export const gs_investasiFooter = atomWithStorage<number>("changeColor", 0)
export const gs_TabPortoInvestasi = atomWithStorage<any | string>("gs_TabPortoInvestasi" , "Draft")
