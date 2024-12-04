import { CreatePortofolio } from "@/app_modules/katalog/portofolio";
import { Portofolio_getMasterBidangBisnis } from "@/app_modules/katalog/portofolio/fun/master/get_bidang_bisnis";

export default async function Page({ params }: { params: { id: string } }) {
  const profileId = params.id;
  const bidangBisnis = await Portofolio_getMasterBidangBisnis();

  return (
    <>
      <CreatePortofolio
        bidangBisnis={bidangBisnis as any}
        profileId={profileId}
      />
    </>
  );
}
