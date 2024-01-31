import { Stack } from "@mantine/core";
import ComponentAdminDonasi_TombolKembali from "../../donasi/component/tombol_kembali";
import ComponentAdminGlobal_HeaderTamplate from "../../component/header_tamplate";

export default function AdminEvent_DetailTipeAcara() {
  return (
    <>
      <Stack>
        <ComponentAdminGlobal_HeaderTamplate name="Event" />
        <ComponentAdminDonasi_TombolKembali />
        <DetailTipeAcara/>
      </Stack>
    </>
  );
}

function DetailTipeAcara(){
    return <>
    
    disiin tipe nya
    </>
}
