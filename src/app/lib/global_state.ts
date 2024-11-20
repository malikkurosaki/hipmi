import { atom } from "jotai";

export type IRealtimeData = {
  status?:
    | "Publish"
    | "Review"
    | "Draft"
    | "Reject"
    // EVNET
    | "Peserta Event"
    // VOTING
    | "Voting Masuk";

  appId: string;
  userId: string;
  pesan: string;
  title: string;
  kategoriApp:
    | "JOB"
    | "VOTING"
    | "EVENT"
    | "DONASI"
    | "INVESTASI"
    | "COLLABORATION"
    | "FORUM";
};

export const gs_realtimeData = atom<IRealtimeData | null>(null);
export const gs_admin_ntf = atom<number>(0);
export const gs_user_ntf = atom<number>(0);
export const gs_count_ntf = atom<number>(0);

// job
export const gs_adminJob_triggerReview = atom<boolean>(false);
export const gs_jobTiggerBeranda = atom<boolean>(false);

// event
export const gs_adminEvent_triggerReview = atom<boolean>(false);
export const gs_eventTriggerBeranda = atom<boolean>(false);

// voting
export const gs_adminVoting_triggerReview = atom<boolean>(false);
export const gs_votingTiggerBeranda = atom<boolean>(false);
