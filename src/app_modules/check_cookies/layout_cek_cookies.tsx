"use client";

import { RouterAuth } from "@/app/lib/router_hipmi/router_auth";
import { useShallowEffect } from "@mantine/hooks";
import { useRouter } from "next/navigation";

export function CheckCookies_UiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useShallowEffect(() => {
    // onCheckCookies();
  }, []);

  // async function onCheckCookies() {
  //   const cek = await fetch("/api/check-cookies");
  //   const result = await cek.json();
  //   if (result.success === false) {
  //     router.push(RouterAuth.login);
  //   }
  // }

  return <>{children}</>;
}
