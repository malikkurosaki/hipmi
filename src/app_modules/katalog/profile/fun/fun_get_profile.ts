import { myConsole } from "@/app/fun/my_console";
import { getProfile } from "..";

/**
 * @function get data profile
 * @param setProfile
 * @returns data profile
 */
export async function loadDataProfile(setProfile: any) {
  await getProfile()
    .then((res) => res)
    .then((val) => {
      setProfile(val);
    });
}
