import { MODEL_USER } from "@/app_modules/home/model/interface";

export interface MODEL_FORUM_POSTING {
  id: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  publishAt: Date;
  diskusi: string;
  authorId: string;
  Author: MODEL_USER;
  _count: number
}

export interface MODEL_FORUM_KOMENTAR {
  id: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  komentar: string;
  forum_PostingId: string;
  authorId: string;
  Author: MODEL_USER
}
