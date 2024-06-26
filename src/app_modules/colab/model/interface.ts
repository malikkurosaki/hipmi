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
  report: string;
  jumlah_partisipan: number;
  ProjectCollaborationMaster_Industri: MODEL_COLLABORATION_MASTER;
  projectCollaborationMaster_IndustriId: number;
  Author: MODEL_USER;
  ProjectCollaborationMaster_Status: MODEL_COLLABORATION_MASTER;
  projectCollaborationMaster_StatusId: number;
  ProjectCollaboration_Partisipasi: MODEL_COLLABORATION_PARTISIPASI[];
}

export interface MODEL_COLLABORATION_PARTISIPASI {
  id: string;
  deskripsi_diri: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  User: MODEL_USER;
  projectCollaborationId: string;
  ProjectCollaboration: MODEL_COLLABORATION;
}

export interface MODEL_COLLABORATION_ROOM_CHAT {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  isActive: true;
  Author: MODEL_USER;
  userId: string;
  ProjectCollaboration: MODEL_COLLABORATION;
  ProjectCollaboration_AnggotaRoomChat: MODEL_COLLABORATION_ANGGOTA_ROOM_CHAT[];
}

export interface MODEL_COLLABORATION_ANGGOTA_ROOM_CHAT {
  id: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  User: MODEL_USER;
  ProjectCollaboration_RoomChat: MODEL_COLLABORATION_ROOM_CHAT;
  projectCollaboration_RoomChatId: string;
}

export interface MODEL_COLLABORATION_NOTIFIKSI {
  id: string;
  isRead: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  note: string;
  ProjectCollaboration: MODEL_COLLABORATION;
}

export interface MODEL_COLLABORATION_MESSAGE {
  id: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  message: string;
  isFile: boolean;
  User: MODEL_USER_FOR_MESSAGE;
}

interface MODEL_USER_FOR_MESSAGE {
  id: string;
  username?: string;
  nomor?: string;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  masterUserRoleId?: string;
  Profile?: MODEL_PROFILE_FOR_MESSAGE;
}


interface MODEL_PROFILE_FOR_MESSAGE{
  userId?: string;
  User?: MODEL_USER;
  id: string;
  name: string;
  email?: string;
  alamat?: string;
  jenisKelamin?: string;
  active?: string;
  createdAt?: Date;
  updatedAt?: Date;
  // ImageProfile?: MODEL_IMAGES;
  // imagesId?: string;
  // ImagesBackground?: MODEL_IMAGES;
  // imagesBackgroundId?: string;
}
