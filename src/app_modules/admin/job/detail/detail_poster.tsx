"use client";

import { RouterJob } from "@/app/lib/router_hipmi/router_job";
import { Center, Image, Stack } from "@mantine/core";
import ComponentAdminGlobal_BackButton from "../../_admin_global/back_button";
import { APIs } from "@/app/lib";
import { useState } from "react";
import ComponentGlobal_Loader from "@/app_modules/_global/component/loader";

export default function AdminJob_DetailPoster({
  imageId,
}: {
  imageId: string;
}) {
  const [isLoading, setLoading] = useState(true);

  return (
    <>
      <Stack>
        <ComponentAdminGlobal_BackButton />
        <Center>
          <Image
            onLoad={() => setLoading(false)}
            alt="Foto"
            src={APIs.GET({ fileId: imageId })}
            mah={500}
            maw={300}
          />
          {isLoading ? (
            <Center h={"100%"}>
              <ComponentGlobal_Loader size={30} variant="dots" />
            </Center>
          ) : (
            ""
          )}
        </Center>
      </Stack>
    </>
  );
}
