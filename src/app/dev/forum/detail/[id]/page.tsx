import Forum_Detail from "@/app_modules/forum/detail";

export default async function Page({params}: {params: {id: string}}) {
  let forumId = params.id

  return (
    <>
      <Forum_Detail forumId={forumId} />
    </>
  );
}
