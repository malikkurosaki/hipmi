import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global/notifikasi_peringatan";
import { funGetListPortofolio } from "./get/get_list_portofolio";

/**
 *
 * @param id - profileId
 * @returns load list portofolio by Id
 */
export async function loadListPortofolio(id: string) {
  if (id === null) {
    return ComponentGlobal_NotifikasiPeringatan("Id null");
  } else {
    const data = await funGetListPortofolio(id).then((res) => res);
    return data;
  }
}
