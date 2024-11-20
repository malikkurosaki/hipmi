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

  async function onCheckCookies() {
    const cek = await fetch("/api/check-cookies");
    console.log(cek, "ini cek");
    const result = await cek.json();
    console.log(result, "ini result");
    if (result.success === false) {
      router.push(RouterAuth.login, { scroll: false });
    }
  }

  return children;
}
