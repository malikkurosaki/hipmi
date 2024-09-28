import { Box } from "@mantine/core";
import { MODEL_JOB } from "../../model/interface";
import { Job_UI_Arsip } from "./ui_arsip";

export default function Job_ViewArsip({ dataJob }: { dataJob: MODEL_JOB[] }) {
  return (
    <>
      <Job_UI_Arsip listData={dataJob} />;
    </>
  );
}
