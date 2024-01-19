import toast from "react-simple-toasts";
import { funGetListPortofolio } from "./get/get_list_portofolio";

/**
 * 
 * @param id - profileId
 * @returns load list portofolio by Id
 */
export async function loadListPortofolio(id: string) {
  if (id === null) {
    return toast("Id null");
  } else {
    const data = await funGetListPortofolio(id).then((res) => res);
    return data
  }
}
