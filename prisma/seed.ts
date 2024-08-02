import prisma from "./../src/app/lib/prisma";
import { generate_seeder } from "./../src/app_modules/_global/fun/generate_seeder";

(async () => {
  console.log("start");
  await generate_seeder();
})().finally(() => {
  console.log("success");
  prisma.$disconnect();
});
