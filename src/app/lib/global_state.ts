import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export type IRealtimeData = {
  status?: "Publish" | "Review" | "Draft" | "Reject" | "Peserta Event";
  
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
export const gs_adminJobTriggerReview = atom<boolean>(false);
export const gs_jobTiggerBeranda = atom<boolean>(false);

// event
export const gs_adminEventTriggerReview = atom<boolean>(false);
export const gs_eventTriggerBeranda = atom<boolean>(false);
