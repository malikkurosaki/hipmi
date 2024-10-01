"use client";

import ComponentJob_DetailData from "../component/detail/detail_data";
import { MODEL_JOB } from "../model/interface";

export default function Job_NonUserView({ data }: { data: MODEL_JOB }) {
  return (
    <>
      <ComponentJob_DetailData data={data} />
    </>
  );
}
