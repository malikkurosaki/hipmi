import { Vote_Beranda } from "@/app_modules/vote";
import { vote_getAllListPublish } from "@/app_modules/vote/fun/get/get_all_list_publish";

export default async function Page() {
    const dataVote = await vote_getAllListPublish({page: 1})

    return (
      <>
        <Vote_Beranda dataVote={dataVote as any} />
      </>
    );
}