import { RouterAdminInvestasi } from "@/app/lib/router_admin/router_admin_investasi";
import { Button } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function AdminInvestasi_ComponentCekBuktiTransfer({
  imagesId,
}: {
  imagesId: string;
}) {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false)
  return (
    <>
      <Button
        loaderPosition="center"
        loading={isLoading}
        radius={"xl"}
        onClick={() => {
          setLoading(true);
          router.push(RouterAdminInvestasi.bukti_transfer + `${imagesId}`);
        }}
      >
        Cek
      </Button>
    </>
  );
}
