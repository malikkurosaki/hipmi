import { MODEL_USER } from "@/app_modules/home/model/interface";

export interface MODEL_COLLABORATION_MASTER {
  id: string;
  name: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface MODEL_COLLABORATION {
  id: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  catatan: string;
  title: string;
  lokasi: string;
  purpose: string;
  benefit: string;
  ProjectCollaborationMaster_Industri: MODEL_COLLABORATION_MASTER;
  projectCollaborationMaster_IndustriId: number;
  Author: MODEL_USER;
  ProjectCollaborationMaster_Status: MODEL_COLLABORATION_MASTER;
  projectCollaborationMaster_StatusId: number;
  ProjectCollaboration_Partisipasi: any[];
}

export interface MODEL_COLLABORATION_PARTISIPASI {
  id: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  User: MODEL_USER;
  projectCollaborationId: string;
  projectCollaboration_RoomChatId: string;
}
