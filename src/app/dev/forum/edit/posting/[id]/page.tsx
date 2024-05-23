import { Forum_EditPosting } from "@/app_modules/forum";
import { forum_getOnePostingById } from "@/app_modules/forum/fun/get/get_one_posting_by_id";

export default async function Page({ params }: { params: { id: string } }) {
  let postingId = params.id;
  const dataPosting = await forum_getOnePostingById(postingId)

  return (
    <>
      <Forum_EditPosting dataPosting={dataPosting as any} />
    </>
  );
}
