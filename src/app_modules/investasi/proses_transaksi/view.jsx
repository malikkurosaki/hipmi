"use client";

import { Warna } from "@/app/lib/warna";
import {
  Box,
  Group,
  NumberInput,
  Divider,
  Center,
  Button,
  Text,
  Container,
  Flex,
} from "@mantine/core";
import { useFocusTrap, useShallowEffect } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import { MODEL_Investasi } from "../model/model_investasi";
import { MODEL_PROFILE_OLD } from "@/app_modules/home/model/user_profile";
import { useEffect, useState } from "react";
import getTokenTransaksi from "../fun/get_token_transaksi";
import toast from "react-simple-toasts";
import funUpdatePaymentInvestasi from "../fun/fun_update_payment";
import { RouterInvestasi } from "@/app/lib/router_hipmi/router_investasi";
import { useAtom } from "jotai";
import { gs_investasiFooter, gs_midtrans_snap } from "../g_state";
import funUpdateInvestasi from "../fun/fun_update_investasi";

export default function ProsesTransaksiInvestasi({ dataInvestasi, userLogin }) {
  const router = useRouter();
  const focusTrapRef = useFocusTrap();
  const [investasi, setInvestasi] = useState(dataInvestasi);
  const [user, setUser] = useState(userLogin);
  const [maxPembelian, setMaxPembelian] = useState(
    Number(investasi.sisaLembar)
  );
  const [total, setTotal] = useState(0);
  const [jumlah, setJumlah] = useState(0);
  const [hotmenu, setHotmenu] = useAtom(gs_investasiFooter);
  const [snapShow, setSnapShow] = useState(false);

  useShallowEffect(() => {
    setJumlah(0)
    setTotal(0)
  },[])

  // console.log(userLogin.id);
  // console.log(investasi);

  async function onProses() {
    const body = {
      // customer_details
      authorId: userLogin.id,
      customer_name: userLogin.username,
      phone: userLogin.nomor,
      // transaction_details
      gross_amount: total,
      // item_details
      item_name: "Saham" + " " + investasi.title,
      price: +investasi.hargaLembar,
      quantity: jumlah,
      merchant_name: investasi.author.username,
      // investasi
      investasiId: investasi.id,
    };

    await getTokenTransaksi(body).then(async (res) => {
      if (res.token.status === 200) {
        // console.log(res.token.value.token)
        // setSnapShow(true);
        snap.pay(res.token.value.token, {
          // embedId: "embedId",
          onSuccess: async function (result) {
            // setSnapShow(false);

            await funUpdatePaymentInvestasi(result, body, res.token.value).then(
              async (resUpdate) => {
                if (resUpdate.status === 200) {
                  // console.log(resUpdate.message)
                  const lembarTersisa = investasi.sisaLembar - resUpdate.data.quantity;

                  const body2 = {
                    id: investasi.id,
                    sisaLembar: lembarTersisa,
                  };

                  await funUpdateInvestasi(body2, investasi);
                  toast(res.message);
                  router.push(
                    RouterInvestasi.status_pesanan + `${resUpdate.data.id}`
                  );

                  setHotmenu(3);
                } else {
                  toast(res.message);
                }
              }
            );
          },
          onPending: async function (result) {
            // console.log("pending");
            // console.log(result);
            // await funUpdatePaymentInvestasi(result, res.dataTransaksi.id);
            // toast(res.message);
            // router.push(
            //   RouterInvestasi.status_pesanan + `${res.dataTransaksi.id}`
            // );
            // router.push(RouterInvestasi.detail + `${investasi.id}`)
            await router.push(RouterInvestasi.detail + `${investasi.id}`);
            setJumlah(0); 
          },
          onClose: async function (result) {
            await router.push(RouterInvestasi.detail + `${investasi.id}`);

            // if (result === undefined) {
            //   const data = {
            //     status_code: "400",
            //   };
            //   // await funUpdatePaymentInvestasi(data, res.dataTransaksi.id);
            //   router.push(RouterInvestasi.main_transaksi);
            //   setSnapShow(false);
            //   // router.push(RouterPay.home);
            //   console.log(data);
            // }
          },
        });
      } else {
        toast("Gagal Membuat Token");
      }
    });
  }

  useEffect(() => {
    const midTransURl = "https://app.sandbox.midtrans.com/snap/snap.js";
    let script = document.createElement("script");
    const midTransClientKey = process.env.Client_KEY;

    script.src = midTransURl;
    script.setAttribute("data-client-key", midTransClientKey);
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      {/* {!snapShow && (
        
      )} */}
      <Box>
        {/* Sisa Lembar Saham */}
        <Group position="apart" mb={"md"}>
          <Text>Sisa Lembar Saham</Text>
          <Text fz={23}>
            {new Intl.NumberFormat("id-ID", {
              maximumFractionDigits: 10,
            }).format(+investasi.sisaLembar)}{" "}
          </Text>
        </Group>

        {/* Harga perlembar saham */}
        <Group position="apart" mb={"md"}>
          <Text>Harga Perlembar</Text>
          <Text fz={23}>
            Rp.{" "}
            {new Intl.NumberFormat("id-ID", {
              maximumFractionDigits: 10,
            }).format(+investasi.hargaLembar)}{" "}
          </Text>
        </Group>

        {/* Lembar saham */}
        <Group position="apart" mb={"md"}>
          <Box>
            <Text>Jumlah Pembelian</Text>
            <Text c={"blue"} fs={"italic"} fz={10}>
              minimal pembelian 10 lembar
            </Text>
            {/* <Text c={"red"} fs={"italic"} fz={10}>
               maximal pembelian {maxPembelian} lembar
             </Text> */}
          </Box>
          <NumberInput
            type="number"
            ref={focusTrapRef}
            w={100}
            max={maxPembelian}
            onChange={(val) => {
              setTotal(val * +investasi.hargaLembar);
              setJumlah(val);
              // console.log(val);
            }}
          />
        </Group>

        <Divider my={"lg"} />

        <Group position="apart" mb={"md"}>
          <Box>
            <Text>Total Harga</Text>
          </Box>
          <Text fz={25}>
            Rp.{" "}
            {new Intl.NumberFormat("id-ID", {
              maximumFractionDigits: 10,
            }).format(total)}
          </Text>
        </Group>

        <Center>
          {jumlah < 10 ? (
            <Button w={350} radius={50} bg={"gray"} disabled>
              Beli 
            </Button>
          ) : (
            <Button
              w={350}
              radius={50}
              bg={Warna.biru}
              onClick={() => {
                onProses();
              }}
            >
              Beli 
            </Button>
          )}
        </Center>
      </Box>

      {/* <Flex align={"center"} justify={"center"} id="embedId" /> */}
    </>
  );
}
