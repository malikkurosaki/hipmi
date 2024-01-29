"use server";

import prisma from "@/app/lib/prisma";

export async function Event_getByStatusId(statusId: string, authorId: string) {
  if (statusId === "1") {
    const data = await prisma.event.findMany({
      where: {
        eventMaster_StatusId: "1",
        authorId: authorId,
      },
      select: {
        id: true,
        title: true,
        deskripsi: true,
        tanggal: true,
      },
    });
    return data;
  }
  if (statusId === "2") {
    const data = await prisma.event.findMany({
      where: {
        eventMaster_StatusId: "2",
        authorId: authorId,
      },
      select: {
        id: true,
        title: true,
        deskripsi: true,
        tanggal: true,
      },
    });
    return data;
  }
  if (statusId === "3") {
    const data = await prisma.event.findMany({
      where: {
        eventMaster_StatusId: "3",
        authorId: authorId,
      },
      select: {
        id: true,
        title: true,
        deskripsi: true,
        tanggal: true,
      },
    });
    return data;
  }
  if (statusId === "4") {
    const data = await prisma.event.findMany({
      where: {
        eventMaster_StatusId: "4",
        authorId: authorId,
      },
      select: {
        id: true,
        title: true,
        deskripsi: true,
        tanggal: true,
      },
    });
    return data;
  }
}
