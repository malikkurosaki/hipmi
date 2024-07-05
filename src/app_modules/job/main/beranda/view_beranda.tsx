import { MODEL_JOB } from "../../model/interface";
import { Job_UiBeranda } from "./ui_beranda";

export default function Job_ViewBeranda({ listJob }: { listJob: MODEL_JOB[] }) {
  return (
    <>
      <Job_UiBeranda listData={listJob} />
    </>
  );
}
