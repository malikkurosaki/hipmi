import _ from "lodash";
import { cookies } from "next/headers";

export async function GET(req: Request) {
  try {
    const cekCookies = cookies();
    const c = cekCookies.get("ssn");

    if (!c || !c?.value || _.isEmpty(c?.value) || _.isUndefined(c?.value)) {
      return Response.json({ success: false });
    }

    return Response.json({ success: true });
  } catch (error) {
    console.log(error);
  }

  return Response.json({ success: false });
}
