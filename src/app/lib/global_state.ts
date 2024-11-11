import { atom } from "jotai";

export type IRealtimeData = {
  status?: "Publish" | "Review" | "Draft" | "Reject";
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
  userRole?: "USER" | "ADMIN";
};

export const gs_realtimeData = atom<IRealtimeData | null>(null);
export const gs_admin_ntf = atom<number>(0);
export const gs_user_ntf = atom<number>(0);

