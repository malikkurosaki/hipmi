import LayoutGlobal_UI_HeaderTamplate from "../component_global/ui/ui_header_tamplate";
import LayoutGlobal_UI_Tamplate from "../component_global/ui/ui_layout_tamplate";
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
      <LayoutGlobal_UI_Tamplate
        header={
          <LayoutGlobal_UI_HeaderTamplate
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
      </LayoutGlobal_UI_Tamplate>
    </>
  );
}
