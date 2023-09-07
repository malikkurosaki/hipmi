import { atomWithStorage } from 'jotai/utils';

export const valueOtp = atomWithStorage("valueOtp", "")
export const valueNomor = atomWithStorage("valueNomor","")
export const valueStatus = atomWithStorage("value_status",false)