import { Forum_ReportKomentarLainnya } from "@/app_modules/forum";
import { user_funGetOneUserId } from "@/app_modules/fun_global/get_user_token";

export default async function Page({ params }: { params: { id: string } }) {
  let komentarId = params.id;
  const userLoginId = await user_funGetOneUserId();

  return (
    <>
      <Forum_ReportKomentarLainnya
        komentarId={komentarId}
        userLoginId={userLoginId}
      />
    </>
  );
}
