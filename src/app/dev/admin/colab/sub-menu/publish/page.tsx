import { AdminColab_TablePublish } from "@/app_modules/admin/colab";
import adminColab_getListAllPublish from "@/app_modules/admin/colab/fun/get/get_list_all_publish";

export default async function Page() {
  const listData = await adminColab_getListAllPublish({ page: 1 });

  return (
    <>
      <AdminColab_TablePublish listData={listData} />
    </>
  );
}
