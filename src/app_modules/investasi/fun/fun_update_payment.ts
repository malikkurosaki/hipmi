"use server";

import prisma from "@/app/lib/prisma";
import { MODEL_Investasi } from "../model/model_investasi";
import { revalidatePath } from "next/cache";
import { RouterInvestasi } from "@/app/lib/router_hipmi/router_investasi";

export interface Model_Midtrans_Success {
  status_code: string;
  status_message: string;
  transaction_id: string;
  order_id: string;
  gross_amount: string;
  payment_type: string;
  transaction_time: string;
  transaction_status: string;
  fraud_status: string;
  va_numbers: [{ bank: string; va_number: string }];
  pdf_url: string;
  finish_redirect_url: string;
}

export default async function funUpdatePaymentInvestasi(
  data: Model_Midtrans_Success,
  idPay: any,
) {
  console.log(data)
  if (data.status_code === "200") {
    const res = await prisma.transaksiInvestasi.update({
      where: {
        id: idPay,
      },
      data: {
        status_code: data.status_code,
        status_message: data.status_message,
        order_id: data.order_id,
        fraud_status: data.fraud_status,
        payment_type: data.payment_type,
        transaction_id: data.transaction_id,
        transaction_status: data.transaction_status,
        transaction_time: data.transaction_time,
        pdf_url: data.pdf_url,
        finish_redirect_url: data.finish_redirect_url,
        namaBank: data.va_numbers[0].bank,
        nomorRekening: data.va_numbers[0].va_number,
      },
    });

    if (!res) return { status: 400, message: "Gagal update transaksi" };

    // const jumlah = Number(res.quantity);
    // const sisa = Number(investasi?.sisaLembar);
    // const hasil = sisa - jumlah;

    // const updateTransaksi = await prisma.investasi.update({
    //   where: {
    //     id: investasi?.id,
    //   },
    //   data: {
    //     sisaLembar: hasil.toString(),
    //   },
    // });

    // console.log(updateTransaksi);
    // if (!updateTransaksi)
    //   return { status: 400, message: "Gagal update investasi" };

    revalidatePath(RouterInvestasi.main_transaksi)

    return {
      status: 200,
      message: "Process",
    };
  } else {
    if (data.status_code === "201") {
      const res = await prisma.transaksiInvestasi.update({
        where: {
          id: idPay,
        },
        data: {
          status_code: "201",
        },
      });
      return {
        message: "Success",
      };
    } else {
      if ((!data.status_code as any) === "400")
        return { status: 400, message: "Update Gagal" };
      return {
        status: 200,
        message: "Berhasil Update",
      };
    }
  }
}
