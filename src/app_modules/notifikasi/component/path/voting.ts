import { RouterVote } from "@/app/lib/router_hipmi/router_vote";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { MODEL_NOTIFIKASI } from "../../model/interface";

export function redirectVotingPage({
  data,
  router,
  onSetPage,
}: {
  data: MODEL_NOTIFIKASI;
  router: AppRouterInstance;
  onSetPage: (val: any) => void;
}) {
  const path = RouterVote.status;

  if (data.status === "Publish") {
    onSetPage({
      menuId: 2,
      status: data.status,
    });
    router.push(path, { scroll: false });
  }
  //   console.log(data)

  if (data.status === "Reject") {
    onSetPage({
      menuId: 2,
      status: data.status,
    });
    router.push(path, { scroll: false });
  }

  if (data.status === "Voting Masuk") {
    router.push(RouterVote.main_detail + data.appId, { scroll: false });
  }
}
