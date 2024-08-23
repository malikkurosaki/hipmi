import prisma from "./../src/app/lib/prisma";
import { generate_seeder } from "./../src/app_modules/_global/fun/generate_seeder";

(async () => {
  console.log("start");
  await generate_seeder();
})()
  .then(() => {
    console.log("success");
    process.exit(0);
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
