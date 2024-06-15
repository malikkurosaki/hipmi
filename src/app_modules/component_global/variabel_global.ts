import { ComponentGlobal_NotifikasiPeringatan } from "./notif_global/notifikasi_peringatan";

/**
 * @returns nilai maksimal untuk upload file di semua module
 */
export let maksimalUploadFile = 2000000;
export const ComponentGlobal_WarningMaxUpload = ({
  text,
  time,
}: {
  text?: string;
  time?: number;
}) => {
  ComponentGlobal_NotifikasiPeringatan(
    text ? text : "Maaf, Ukuran file terlalu besar, maximum 2mb",
    time ? time : 3000
  );
};
