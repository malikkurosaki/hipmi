import UIGlobal_LayoutHeaderTamplate from "../_global/ui/ui_header_tamplate";
import UIGlobal_LayoutTamplate from "../_global/ui/ui_layout_tamplate";
import { MODEL_JOB } from "../job/model/interface";
import {
  ComponentHome_ButtonHeaderLeft,
  ComponentHome_ButtonHeaderRight,
} from "./component/button_header";
import { Home_UiFooter, Home_UiView } from "./component/ui_home";
import { MODEL_USER } from "./model/interface";

export default function HomeView({
  dataUser,
  dataJob,
  countNotifikasi,
}: {
  dataUser: MODEL_USER;
  dataJob: MODEL_JOB[];
  countNotifikasi: number;
}) {
  


  return (
    <>
      <UIGlobal_LayoutTamplate
        header={
          <UIGlobal_LayoutHeaderTamplate
            title="HIPMI"
            customButtonLeft={
              <ComponentHome_ButtonHeaderLeft dataUser={dataUser} />
            }
            customButtonRight={
              <ComponentHome_ButtonHeaderRight
                dataUser={dataUser}
                countNotifikasi={countNotifikasi}
              />
            }
          />
        }
        footer={<Home_UiFooter dataUser={dataUser} />}
      >
        <Home_UiView dataJob={dataJob} dataUser={dataUser} />
      </UIGlobal_LayoutTamplate>
    </>
  );
}
