import { Vote_Beranda } from "@/app_modules/vote";
import { Vote_getAllListPublish } from "@/app_modules/vote/fun/get/get_all_list_publish";

export default async function Page() {
    const dataVote = await Vote_getAllListPublish()

    return (
      <>
        <Vote_Beranda dataVote={dataVote as any} />
      </>
    );
}