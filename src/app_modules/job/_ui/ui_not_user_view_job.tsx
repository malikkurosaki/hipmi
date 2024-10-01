"use client";

import {
  UIGlobal_LayoutHeaderTamplate,
  UIGlobal_LayoutTamplate,
} from "@/app_modules/_global/ui";
import { Job_ViewNotUserJobVacany } from "../_view";

export function Job_UiNotUserView({ data }: { data: any }) {
  return (
    <>
      <UIGlobal_LayoutTamplate
        header={
          <UIGlobal_LayoutHeaderTamplate title="Job Vacancy" hideButtonLeft />
        }
      >
        <Job_ViewNotUserJobVacany data={data} />
      </UIGlobal_LayoutTamplate>
    </>
  );
}
