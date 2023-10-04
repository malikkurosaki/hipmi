import { getProfile } from "..";

/**
 * @function get data profile
 * @param setProfile
 * @returns data profile
 */
export async function g_getProfile(setProfile: any) {
    const data = await getProfile().then((res) => res);
    setProfile(data)
  }