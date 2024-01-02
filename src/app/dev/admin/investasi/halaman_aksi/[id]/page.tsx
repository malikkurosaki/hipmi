import { Admin_HalamanAksi } from "@/app_modules/admin/investasi";

export default async function Page({params}:{params: {id: string}}) {

  return (
    <>
      <Admin_HalamanAksi idInves={params.id} />
    </>
  );
}
