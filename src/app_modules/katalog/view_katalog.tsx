import { MODEL_PORTOFOLIO } from "./portofolio/model/interface";
import { MODEL_PROFILE } from "./profile/model/interface";
import { Katalog_UiView } from "./ui/ui_katalog";

export async function Katalog_MainView({
  profile,
  listPorto,
  userLoginId,
}: {
  profile: MODEL_PROFILE;
  listPorto: MODEL_PORTOFOLIO;
  userLoginId: string;
}) {
  return (
    <>
      <Katalog_UiView
        listPorto={listPorto}
        profile={profile}
        userLoginId={userLoginId}
      />
    </>
  );
}
