import { Colab_Status } from "@/app_modules/colab";
import colab_getListByStatusId from "@/app_modules/colab/fun/get/get_list_by_status_id";

export default async function Page() {
  const listPublish = (await colab_getListByStatusId(1)).data;
  const listReview = (await colab_getListByStatusId(2)).data;
  const listReject = (await colab_getListByStatusId(3)).data;


  return (
    <>
      <Colab_Status
        listPublish={listPublish as any}
        listReview={listReview as any}
        listReject={listReject as any}
      />
    </>
  );
}
