import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import Ui_Konfirmasi from "@/app_modules/event/_ui/konfirmasi";
import { event_funCheckPesertaByUserId } from "@/app_modules/event/fun";
import { event_getOneById } from "@/app_modules/event/fun/get/get_one_by_id";
import moment from "moment";
import { redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const eventId = (await params).id;


  // const userLoginId = await funGetUserIdByToken();

  // const checkPeserta = await event_funCheckPesertaByUserId({
  //   eventId: eventId,
  //   userId: userLoginId as string,
  // });

  // if (dataEvent == null) return redirect("/dev/event/main/beranda");

  // if (moment(dataEvent?.tanggal).diff(moment(), "minutes") > 0)
  //   return redirect("/dev/event/main/beranda");

  // if (dataEvent?.isArsip)
  //   return redirect(`/dev/event/detail/riwayat/${dataEvent.id}`);

  // if (checkPeserta == false)
  //   return redirect(`/dev/event/detail/main/${eventId}`);

  //   if (checkKehadiran) {
  //     return redirect(`/dev/event/main/beranda`);
  //   }

  return (
    <>
      <Ui_Konfirmasi userLoginId={"" as string} eventId={eventId} />
    </>
  );
}
