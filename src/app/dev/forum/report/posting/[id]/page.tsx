import { Forum_ReportPosting } from "@/app_modules/forum";

export default async function Page({ params }: { params: { id: string } }) {
  let id = params.id;

  return (
    <>
      <Forum_ReportPosting id={id} />
    </>
  );
}
