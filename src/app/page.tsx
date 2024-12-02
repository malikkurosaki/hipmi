import { redirect } from "next/navigation";
import versionUpdate from "../../package.json";

export default async function Page() {
  const version = versionUpdate.version;

  // return <Login  version={version} />;
  return redirect("/dev/home");
  // return <PageSplash />;
}
