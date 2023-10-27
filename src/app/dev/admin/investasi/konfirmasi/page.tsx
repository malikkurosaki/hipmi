import { Admin_KonfirmasiInvestasi } from "@/app_modules/admin/investasi";


export default async function Page({ params }: { params: { id: string } }) {
  return (
    <>
      <Admin_KonfirmasiInvestasi id={params.id} />
    </>
  );
}
