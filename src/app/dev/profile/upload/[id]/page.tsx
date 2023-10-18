import { UploadFotoProfile } from "@/app_modules/katalog/profile";
import { unsealData } from "iron-session";
import { cookies } from "next/headers";
import yaml from "yaml";
import fs from "fs";
import { funGetUserProfile } from "@/app_modules/fun/get_user_profile";
const config = yaml.parse(fs.readFileSync("config.yaml").toString());

export default async function Page() {
  const c = cookies().get("ssn");
  const usr = JSON.parse(
    await unsealData(c?.value as string, {
      password: config.server.password,
    })
  );

  const imageUrl = await funGetUserProfile(usr.id).then(
    (res) => res?.Profile?.ImageProfile?.url
  );

  return (
    <>
      <UploadFotoProfile imageUrl={imageUrl} />
    </>
  );
}
