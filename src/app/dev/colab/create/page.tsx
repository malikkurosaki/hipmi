import { Colab_Create } from "@/app_modules/colab";
import colab_funGetMasterIndustri from "@/app_modules/colab/fun/master/fun_get_master_industri";
import colab_funGetMasterStatus from "@/app_modules/colab/fun/master/fun_get_master_status";

export default async function Page() {
  const listIndustri = await colab_funGetMasterIndustri();

  return (
    <>
      <Colab_Create listIndustri={listIndustri as any} />
    </>
  );
}
