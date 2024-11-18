"use client";
import { CheckCookies_UiLayout } from "@/app_modules/check_cookies";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CheckCookies_UiLayout>{children}</CheckCookies_UiLayout>
    </>
  );
}
