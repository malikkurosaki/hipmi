import { PortofolioInvestasi } from "@/app_modules/investasi";
import { cookies } from "next/headers";
import fs from "fs";
import yaml from "yaml";
import { unsealData } from "iron-session";
import getInvestasiByStatusId from "@/app_modules/investasi/fun/get_investasi_by_id";
import getStatusInvestasi from "@/app_modules/investasi/fun/master/get_status_investasi";
import getPortoByStatusId from "@/app_modules/investasi/fun/get_porto_status_by_id";
import { user_funGetOneUserId } from "@/app_modules/fun_global/get_user_token";
import { Investasi_UiPortofolio } from "@/app_modules/investasi/_ui";
import {
  investasi_funGetAllInvestasiNonPublishByUserId,
  investasi_funGetAllPublishByUserId,
} from "@/app_modules/investasi/_fun";

export default async function Page() {
  const userId = await user_funGetOneUserId();
  if (!userId) return <div>{"User Tidak ditemukan"}</div>;
  const listStatus = await getStatusInvestasi();
  const dataDraft = await getPortoByStatusId(userId, 1);
  const dataReview = await getPortoByStatusId(userId, 2);
  const dataPublish = await getPortoByStatusId(userId, 3);
  const dataReject = await getPortoByStatusId(userId, 4);

  const listDataPublish = await investasi_funGetAllPublishByUserId({ page: 1 });
  const listDataReview = await investasi_funGetAllInvestasiNonPublishByUserId({
    page: 1,
    statusId: "2",
  });
  const listDataDraft = await investasi_funGetAllInvestasiNonPublishByUserId({
    page: 1,
    statusId: "3",
  });
  const listDataReject = await investasi_funGetAllInvestasiNonPublishByUserId({
    page: 1,
    statusId: "4",
  });

  return (
    <>
      {/* <PortofolioInvestasi
        listStatusInvestasi={listStatusInvestasi as any}
        dataDraft={dataDraft}
        dataReview={dataReview}
        dataPublish={dataPublish}
        dataReject={dataReject}
      /> */}
      <Investasi_UiPortofolio
        listStatus={listStatus}
        listDataPublish={listDataPublish}
        listDataReview={listDataReview}
        listDataDraft={listDataDraft}
        listDataReject={listDataReject}
      />
    </>
  );
}
