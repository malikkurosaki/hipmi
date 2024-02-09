import { MODEL_USER } from "@/app_modules/home/model/interface";

export interface MODEL_VOTING {
  id: string;
  title: string;
  deskripsi: string;
  awalVote: Date;
  akhirVote: Date;
  isActive: boolean;
  createdAt: Date;
  updateAt: Date;
  catatan: string;
  authorId: string,
  Author: MODEL_USER
  Voting_DaftarNamaVote: MODEL_VOTING_DAFTAR_NAMA_VOTE[];
}

export interface MODEL_VOTING_DAFTAR_NAMA_VOTE {
  id: string;
  value: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  votingId: string;
}
