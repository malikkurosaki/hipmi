import { Vote_Status } from "@/app_modules/vote";
import {
  vote_funGetAllByStatusId,
  voting_getMasterStatus,
} from "@/app_modules/vote/fun";

export default async function Page({ params }: { params: { id: string } }) {
  const statusId = params.id;

  const listStatus = await voting_getMasterStatus();
  const dataVoting = await vote_funGetAllByStatusId({
    page: 1,
    statusId: statusId,
  });

  return (
    <>
      <Vote_Status
        statusId={statusId}
        dataVoting={dataVoting as any}
        listStatus={listStatus as any}
      />
    </>
  );
}
