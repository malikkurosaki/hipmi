import { MODEL_USER } from "@/app_modules/home/model/interface";
import {
  MODEL_NEW_DEFAULT_MASTER
} from "@/app_modules/model_global/interface";

export interface MODEL_JOB {
  id: string;
  title: string;
  content: string;
  deskripsi: string;
  isActive: boolean;
  isArsip: boolean;
  createdAt: Date;
  updateAt: Date;
  catatan: string;
  authorId: string;
  Author: MODEL_USER;
  MasterStatus: MODEL_NEW_DEFAULT_MASTER;
  masterStatusId: string;
  imageId: string;
}
