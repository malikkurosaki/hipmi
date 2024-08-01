import prisma from "@/app/lib/prisma";

export async function notifikasiToUser_CreateKabarDonasi({
  donasiId,
}: {
  donasiId: string;
}) {
  const getDonatur = await prisma.donasi_Invoice.findMany({
    where: {
      donasiId: donasiId,
    },
    select: {
      Donasi: {
        select: {
          id: true,
          authorId: true,
          title: true,
        },
      },
    },
  });

  console.log(getDonatur)
}
