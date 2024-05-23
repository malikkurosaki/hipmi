import { Login } from "@/app_modules/auth";
import { cookies } from "next/headers";

export default function Page() {
  const c = cookies().getAll();

  return (
    <>
      <Login />
    </>
  );
}
