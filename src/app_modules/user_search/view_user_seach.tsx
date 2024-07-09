
import { MODEL_USER } from "@/app_modules/home/model/interface";
import LayoutGlobal_UI_HeaderTamplate from "../component_global/ui/ui_header_tamplate";
import LayoutGlobal_UI_Tamplate from "../component_global/ui/ui_layout_tamplate";
import { UserSearch_UiView } from "./component/ui_user_search";

export default function UserSearch_MainView({
  listUser,
}: {
  listUser: MODEL_USER[];
}) {
  return (
    <>
      <LayoutGlobal_UI_Tamplate
        header={<LayoutGlobal_UI_HeaderTamplate title="Pencarian Pengguna" />}
      >
        <UserSearch_UiView listUser={listUser} />
      </LayoutGlobal_UI_Tamplate>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </>
  );
}
