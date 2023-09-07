import {atomWithStorage} from "jotai/utils"

export const valueCookies = atomWithStorage<any | null>("valueCookies", null)