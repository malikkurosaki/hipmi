import { Forum_ReportKomentarLainnya } from "@/app_modules/forum";

export default async function Page({ params }: { params: { id: string } }) {
  let komentarId = params.id;

  return (
    <>
      <Forum_ReportKomentarLainnya komentarId={komentarId} />
    </>
  );
}
