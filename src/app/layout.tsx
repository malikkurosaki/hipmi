import MqttLoader from "@/util/mqtt_loader";
import RootStyleRegistry from "./emotion";
import "./globals.css";
import { TokenProvider } from "./lib/token";

const token = process.env.WS_APIKEY;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!token)
    return (
      <>
        <center style={{ height: "100vh" }}>Require Token Storage</center>
      </>
    );
  return (
    <RootStyleRegistry>
      <MqttLoader />
      <TokenProvider token={token} />
      {children}
    </RootStyleRegistry>
  );
}
