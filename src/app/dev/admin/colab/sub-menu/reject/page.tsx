import { AdminColab_TableRejected } from "@/app_modules/admin/colab";
import adminColab_getListAllRejected from "@/app_modules/admin/colab/fun/get/get_list_all_reject";

export default async function Page() {
    const listReject = await adminColab_getListAllRejected({page: 1})

    return (
      <>
        <AdminColab_TableRejected listReject={listReject as any} />
      </>
    );
}