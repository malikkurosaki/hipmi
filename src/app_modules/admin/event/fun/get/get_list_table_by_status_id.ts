"use server";

import prisma from "@/app/lib/prisma";

export async function AdminEvent_getListTableByStatusId(statudId: string) {
  if (statudId === "1") {
    const getPublish = await prisma.event.findMany({
      orderBy: {
        tanggal: "desc",
      },
      where: {
        eventMaster_StatusId: "1",
        tanggal: {
          gte: new Date(),
        },
      },
      select: {
        id: true,
        title: true,
        lokasi: true,
        tanggal: true,
        deskripsi: true,
        Author: {
          select: {
            id: true,
            username: true,
            Profile: {
              select: {
                name: true,
              },
            },
          },
        },
        EventMaster_Status: {
          select: {
            id: true,
            name: true,
          },
        },
        EventMaster_TipeAcara: {
          select: {
            id: true,
            name: true,
          },
        },
        Event_Peserta: true,
      },
    });
    return getPublish;
  }
  if (statudId === "2") {
    const getReview = await prisma.event.findMany({
      orderBy: {
        updatedAt: "desc",
      },
      where: {
        eventMaster_StatusId: "2",
        active: true,
      },
      select: {
        id: true,
        title: true,
        lokasi: true,
        tanggal: true,
        deskripsi: true,
        Author: {
          select: {
            id: true,
            username: true,
            Profile: {
              select: {
                name: true,
              },
            },
          },
        },
        EventMaster_Status: {
          select: {
            id: true,
            name: true,
          },
        },
        EventMaster_TipeAcara: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    return getReview;
  }
  if (statudId === "3") {
    const getDraft = await prisma.event.findMany({
      orderBy: {
        updatedAt: "desc",
      },
      where: {
        eventMaster_StatusId: "3",
      },
    });
    return getDraft;
  }
  if (statudId === "4") {
    const getReject = await prisma.event.findMany({
      orderBy: {
        updatedAt: "desc",
      },
      where: {
        eventMaster_StatusId: "4",
      },
      select: {
        id: true,
        title: true,
        lokasi: true,
        tanggal: true,
        deskripsi: true,
        Author: {
          select: {
            id: true,
            username: true,
            Profile: {
              select: {
                name: true,
              },
            },
          },
        },
        EventMaster_Status: {
          select: {
            id: true,
            name: true,
          },
        },
        EventMaster_TipeAcara: {
          select: {
            id: true,
            name: true,
          },
        },
        catatan: true,
      },
    });
    return getReject;
  }
}
