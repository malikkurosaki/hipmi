import { EditIntroInvestasi } from "@/app_modules/investasi";

export default async function Page({ params }: { params: { id: string } }) {
  return (
    <>
      <EditIntroInvestasi />
    </>
  );
}
