import { Login } from "@/app_modules/auth";
import { cookies } from "next/headers";
import {atom} from "jotai"

export default async function Page() {
  const c  = cookies().get("session")
  const data = !c ? null : c.value
  

  return (
    <>
    {JSON.stringify(data)}
   <Login />
    </>
  );
}
