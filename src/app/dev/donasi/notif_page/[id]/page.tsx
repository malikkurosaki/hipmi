import { Donasi_NotifPage } from "@/app_modules/donasi";
import { Donasi_getNotifByUserId } from "@/app_modules/donasi/fun/get/get_notif_by_user_id";

export default async function Page({ params }: { params: { id: string } }) {
  let userId = params.id;
  const dataNotif = await Donasi_getNotifByUserId(userId);
// console.log(dataNotif)

  return (
    <>
      <Donasi_NotifPage dataNotif={dataNotif as any} />
    </>
  );
}
