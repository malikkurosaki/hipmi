import { myConsole } from "@/app/fun/my_console";
import { CreatePortofolio } from "@/app_modules/katalog/portofolio";
import { getBidangBisnis } from "@/app_modules/katalog/portofolio/fun/get_bidang_bisnis";

export default async function Page({ params }: { params: { id: string } }) {
  const bidangBisnis = await getBidangBisnis();

  return (
    <>
      <CreatePortofolio
        bidangBisnis={bidangBisnis as any}
        profileId={params.id}
      />
    </>
  );
}
