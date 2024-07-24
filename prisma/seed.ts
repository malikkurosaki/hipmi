import prisma from "@/app/lib/prisma";

(async () => {
    console.log("start");
})().finally(() => {
  console.log("success");
  prisma.$disconnect();
});
