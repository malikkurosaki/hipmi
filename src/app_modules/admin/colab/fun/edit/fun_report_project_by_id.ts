"use server";

import prisma from "@/app/lib/prisma";
import { RouterAdminColab } from "@/app/lib/router_admin/router_admin_colab";
import { user_funGetOneUserId } from "@/app_modules/fun_global/get_user_token";
import { revalidatePath } from "next/cache";

export default async function adminColab_funReportProjectById({
  colabId,
  report,
}: {
  colabId: string;
  report: string;
}) {
  const authorId = await user_funGetOneUserId();

  const projectUpdate = await prisma.projectCollaboration.update({
    where: {
      id: colabId,
    },
    data: {
      isActive: false,
      isReject: true,
      report: report,
    },
    select: {
      userId: true,
    },
  });

  if (!projectUpdate) return { status: 400, message: "Gagal update project" };

  const updateReport = await prisma.projectCollaboration_Notifikasi.create({
    data: {
      projectCollaborationId: colabId,
      adminId: authorId,
      userId: projectUpdate.userId as any,
      note: "Project Anda Telah Direport Admin",
    },
  });

  if (!updateReport) return { status: 400, message: "Gagal update notifikasi" };

  revalidatePath(RouterAdminColab.table_publish);
  return { status: 200, message: "Berhasil Update" };
}
