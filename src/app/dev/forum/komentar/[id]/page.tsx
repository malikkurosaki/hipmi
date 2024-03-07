import { Forum_Komentar } from "@/app_modules/forum";

export default async function Page({params}: {params: {id: string}}) {
    let forumId = params.id
    

  return (
    <>
      <Forum_Komentar forumId={forumId} />
    </>
  );
}
