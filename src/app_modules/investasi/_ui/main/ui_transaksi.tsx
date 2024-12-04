"use client";

import { Investasi_ViewDaftarTransaksi } from "../../_view/main/view_transaksi";

export function Investasi_UiDaftarTransaksi({
  dataTransaksi,
}: {
  dataTransaksi: any[];
}) {
  return (
    <>
      <Investasi_ViewDaftarTransaksi dataTransaksi={dataTransaksi} />
    </>
  );
}
