import { AdminForum_TablePublish } from "@/app_modules/admin/forum";
import { adminForum_getListPublish } from "@/app_modules/admin/forum/fun/get/get_list_publish";

export default async function Page() {
  const listPublish = await adminForum_getListPublish();

  return (
    <>
      <AdminForum_TablePublish listPublish={listPublish as any} />
    </>
  );
}
