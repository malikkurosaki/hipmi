import { AdminEvent_UiDetailPeserta } from "@/app_modules/admin/event/_ui";
import { adminEvent_getListPesertaById } from "@/app_modules/admin/event/fun/get/get_list_peserta_by_id";

export default async function Page({ params }: { params: { id: string } }) {
  const eventId = params.id;
  const dataPeserta = await adminEvent_getListPesertaById({ eventId, page: 1 });

  return (
    <>
      <AdminEvent_UiDetailPeserta dataPeserta={dataPeserta} eventId={eventId} />
    </>
  );
}
