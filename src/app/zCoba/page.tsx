import ComponentGlobal_HeaderTamplate from "@/app_modules/component_global/header_tamplate";
import LayoutGlobal_UI_Tamplate from "@/app_modules/component_global/ui/ui_layout_tamplate";
import Coba_TestLoading from "@/app_modules/zCoba";
import { Text } from "@mantine/core";

export default async function Page() {
  await new Promise((a, b) => {
    setTimeout(a, 3000);
  });

  return (
    <>
      <Coba_TestLoading />
      {/* <ComponentGlobal_UI_LayoutTamplate /> */}
    </>
  );
}
