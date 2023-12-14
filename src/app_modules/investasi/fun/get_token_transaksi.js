"use server";

import prisma from "@/app/lib/prisma";
import MidTrans from "midtrans-client";

const snap = new MidTrans.Snap({
  isProduction: false,
  serverKey: process.env.Server_KEY,
  clientKey: process.env.Client_KEY,
});

export default async function getTokenTransaksi(data) {
  const body = await data;
  // console.log(body);

  const date = new Date();
  const randomId = date.getTime();

  const params = {
    transaction_details: {
      order_id: "hipmi_" + randomId,
      gross_amount: body.gross_amount,
    },
    item_details: [
      {
        id: "item_hipmi_" + randomId,
        name: body.item_name,
        price: body.price,
        quantity: body.quantity,
        merchant_name: body.merchant_name,
      },
    ],
    customer_details: {
      first_name: body.customer_name,
      phone: body.phone,
      // email: "test@midtrans.com",
    },
    enabled_payments: [
      "permata_va",
      "bca_va",
      "bni_va",
      "bri_va",
      "cimb_va",
      "other_va",
      "shopeepay",
    ],
    bca_va: {
      va_number: "82340374411111",
      sub_company_code: "00000",
      free_text: {
        inquiry: [
          {
            en: "Pay according to the invoice",
            id: "Bayar sesuai faktur",
          },
        ],
        payment: [
          {
            en: "Pay according to the invoice",
            id: "Bayar sesuai faktur",
          },
        ],
      },
    },
  };

  const token = await new Promise(async (res) => {
    try {
      const transaksi = await snap.createTransaction(params);
      //   console.log(transaksi);
      res({
        status: 200,
        value: transaksi,
      });
    } catch (error) {
      //   console.log(error);
      res({
        status: 400,
        value: error,
      });
    }
  });

  if (token.status === 400) {
    return { token: token };
  }

  const newTransaksi = await prisma.transaksiInvestasi.create({
    data: {
      gross_amount: "" + data.gross_amount,
      merchant_name: data.merchant_name,
      price: "" + data.price,
      quantity: "" + data.quantity,
      token: token.value.token,
      redirect_url: token.value.redirect_url,
      authorId: data.authorId,
      investasiId: data.investasiId,
    },
  });

  return {
    token: token,
    dataTransaksi: newTransaksi,
  };
}
