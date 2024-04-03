import { Colab_MainDetail } from "@/app_modules/colab";
import { User_getUserId } from "@/app_modules/fun_global/get_user_token";

export default async function Page({ params }: { params: { id: string } }) {
  let colabId = params.id
  const userLoginId = await User_getUserId()

  return (
    <>
      <Colab_MainDetail />
    </>
  );
}
