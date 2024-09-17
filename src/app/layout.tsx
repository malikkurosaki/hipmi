import MqttLoader from "@/util/mqtt_loader";
import RootStyleRegistry from "./emotion";
import "./globals.css";
import { TokenProvider } from "./lib/token";

const token = process.env.WS_APIKEY;
const pwdCookies = process.env.PWD;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!token) return <>Require Token Storage</>;
  console.log(pwdCookies)
  return (
    <RootStyleRegistry>
      <MqttLoader />
      <TokenProvider token={token} />
      {children}
    </RootStyleRegistry>
  );
}
