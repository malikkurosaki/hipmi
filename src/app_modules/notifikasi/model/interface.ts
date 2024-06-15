import { MODEL_USER } from "@/app_modules/home/model/interface";
import { MODEL_NEW_DEFAULT_MASTER } from "@/app_modules/model_global/interface";
export interface MODEL_NOTIFIKASI {
  id: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  appId: string;
  kategoriApp: string;
  isRead: boolean;
  title: string,
  pesan: string;
  User: MODEL_USER;
  userId: string;
  Admin: MODEL_USER;
  adminId: string;
  status?: string;
  Role: MODEL_NEW_DEFAULT_MASTER;
  userRoleId: String;
}
