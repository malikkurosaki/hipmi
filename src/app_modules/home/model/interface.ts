import { MODEL_PROFILE } from "@/app_modules/katalog/profile/model/interface";

export interface MODEL_USER {
  id: string;
  username: string;
  nomor: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  masterUserRoleId: string;
  Profile: MODEL_PROFILE
}

