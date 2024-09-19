import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import { Forum_ReportPostingLainnya } from "@/app_modules/forum";

export default async function Page({ params }: { params: { id: string } }) {
  let postingId = params.id;
  const userLoginId = await funGetUserIdByToken();

  return (
    <>
      <Forum_ReportPostingLainnya
        postingId={postingId}
        userLoginId={userLoginId}
      />
    </>
  );
}
