import MqttLoader from "@/util/mqtt_loader";
import RootStyleRegistry from "./emotion";
import { Container } from "@mantine/core";
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RootStyleRegistry>
      <MqttLoader />
      {children}
    </RootStyleRegistry>
  );
}
