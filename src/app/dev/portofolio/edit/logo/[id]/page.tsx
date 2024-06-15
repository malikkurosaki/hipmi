import { Portofolio_EditLogoBisnis } from "@/app_modules/katalog/portofolio";
import { portofolio_getOneById } from "@/app_modules/katalog/portofolio/fun/get/get_one_portofolio";
import _ from "lodash";

export default async function Page({ params }: { params: { id: string } }) {
  let portoId = params.id;
  const dataPorto = await portofolio_getOneById(portoId).then((res) =>
    _.omit(res, [
      "Logo",
      "MasterBidangBisnis",
      "Portofolio_MediaSosial",
      "active",
      "alamatKantor",
      "deskripsi",
      "masterBidangBisnisId",
      "profileId",
      "tlpn",
      "namaBisnis"
    ])
  );

  return (
    <>
      <Portofolio_EditLogoBisnis  dataPorto={dataPorto as any} />
    </>
  );
}
