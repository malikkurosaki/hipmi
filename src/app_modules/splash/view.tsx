"use client";

import { Flex, Text, Title } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function SplashScreen({ token }: { token: any }) {
  const [splash, setSplash] = useState(true);

  useShallowEffect(() => {
    setTimeout(() => setSplash(!splash), 2000);
  }, []);
  return (
    <>
      {(() => {
        if (splash) {
          return (
            <>
              <Flex
                align={"center"}
                justify={"center"}
                h={"100vh"}
                direction={"column"}
              >
                <Title>Splash Screen</Title>
                <Text>Welcome to HIPMI</Text>
              </Flex>
            </>
          );
        } else {
          if (token == null) {
            return redirect("/dev/auth/login");
          } else {
            return redirect("/dev/home");
          }
        }
      })()}
    </>
  );
}
