import { Forum_ReportPostingLainnya } from "@/app_modules/forum";

export default async function Page({ params }: { params: { id: string } }) {
  let postingIg = params.id;

  return (
    <>
      <Forum_ReportPostingLainnya postingIg={postingIg} />
    </>
  );
}
