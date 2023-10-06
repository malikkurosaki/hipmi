import toast from "react-simple-toasts";
import getListPortofolio from "../api/get-portofolio";

/**
 * 
 * @param id - profileId
 * @returns load list portofolio by Id
 */
export async function loadListPortofolio(id: string) {
  if (id === null) {
    return toast("Id null");
  } else {
    const data = await getListPortofolio(id).then((res) => res);
    return data
  }
}
