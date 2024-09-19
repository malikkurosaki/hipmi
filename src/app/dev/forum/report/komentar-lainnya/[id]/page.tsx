import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import { Forum_ReportKomentarLainnya } from "@/app_modules/forum";

export default async function Page({ params }: { params: { id: string } }) {
  let komentarId = params.id;
  const userLoginId = await funGetUserIdByToken();

  return (
    <>
      <Forum_ReportKomentarLainnya
        komentarId={komentarId}
        userLoginId={userLoginId}
      />
    </>
  );
}
