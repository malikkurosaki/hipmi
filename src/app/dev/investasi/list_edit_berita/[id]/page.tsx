import { ListEditBeritaInvestasi } from "@/app_modules/investasi";

export default async function Page({params}: {params: {id: string}}) {
  return (
    <>
      <ListEditBeritaInvestasi id={params.id} />
    </>
  );
}
