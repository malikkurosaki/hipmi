import { atomWithStorage } from 'jotai/utils'

export const gs_nomor = atomWithStorage<any | null>("nomorHp", null)
export const gs_otp = atomWithStorage<any | null>("code_otp", null)