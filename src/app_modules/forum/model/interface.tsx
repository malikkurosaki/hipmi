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
  _count: number;
  Forum_Komentar: MODEL_FORUM_KOMENTAR[];
  Forum_ReportPosting: MODEL_FORUM_MASTER_REPORT[];
  ForumMaster_StatusPosting: MODEL_FORUM_MASTER_STATUS;
}

export interface MODEL_FORUM_KOMENTAR {
  id: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  komentar: string;
  forum_PostingId: string;
  authorId: string;
  Author: MODEL_USER;
  Forum_ReportKomentar: MODEL_FORUM_MASTER_REPORT[];
}

export interface MODEL_FORUM_MASTER_REPORT {
  id: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  deskripsi: string;
}

export interface MODEL_FORUM_MASTER_STATUS {
  id: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  status: string;
}

export interface MODEL_FORUM_REPORT {
  id: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  deskripsi: string;
  ForumMaster_KategoriReport: MODEL_FORUM_MASTER_REPORT;
  forumMaster_KategoriReportId: string;
  User: MODEL_USER;
}
