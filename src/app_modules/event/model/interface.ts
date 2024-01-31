import { MODEL_USER } from "@/app_modules/home/model/interface";
import { MODEL_DEFAULT_MASTER } from "@/app_modules/model_global/interface";

export interface MODEL_EVENT {
  id: string;
  title: string;
  lokasi: string;
  tanggal: Date;
  deskripsi: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  catatan: string;
  authorId: string;
  Author: MODEL_USER;
  eventMaster_StatusId: string;
  EventMaster_Status: MODEL_DEFAULT_MASTER;
  eventMaster_TipeAcaraId: number;
  EventMaster_TipeAcara: MODEL_DEFAULT_MASTER;
  Event_Peserta: MODEL_EVENT_PESERTA[];
}

export interface MODEL_EVENT_PESERTA {
  id: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  User: MODEL_USER;
  eventId: string;
  Event: MODEL_EVENT;
}
