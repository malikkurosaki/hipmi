import { Vote_Kontribusi } from "@/app_modules/vote";
import { vote_getAllListKontribusiByAuthorId } from "@/app_modules/vote/fun/get/get_list_kontribusi_by_author_id";

export default async function Page() {
  const dataKontribusi = await vote_getAllListKontribusiByAuthorId({ page: 1 });
  return (
    <>
      <Vote_Kontribusi dataKontribusi={dataKontribusi as any} />
    </>
  );
}
