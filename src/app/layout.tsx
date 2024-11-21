import MqttLoader from "@/util/mqtt_loader";
import RootStyleRegistry from "./emotion";
// import "./globals.css";
import { TokenProvider } from "./lib/token";
import dotenv from "dotenv";
import { ServerEnv } from "./lib/server_env";
import { RealtimeProvider } from "./lib";
import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
dotenv.config({
  path: ".env",
});

const token = process.env.WS_APIKEY;

const DATABASE_URL = process.env.DATABASE_URL!;
const WIBU_PWD = process.env.WIBU_PWD!;
const Client_KEY = process.env.Client_KEY!;
const Server_KEY = process.env.Server_KEY!;
const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN!;
const WS_APIKEY = process.env.WS_APIKEY!;

if (!DATABASE_URL) throw new Error("Require DATABASE_URL");
if (!WIBU_PWD) throw new Error("Require WIBU_PWD");
if (!Client_KEY) throw new Error("Require Client_KEY");
if (!Server_KEY) throw new Error("Require Server_KEY");
if (!MAPBOX_TOKEN) throw new Error("Require MAPBOX_TOKEN");
if (!WS_APIKEY) throw new Error("Require WS_APIKEY");

const envObject = {
  DATABASE_URL,
  WIBU_PWD,
  Client_KEY,
  Server_KEY,
  MAPBOX_TOKEN,
  WS_APIKEY,
};
ServerEnv.set(envObject);

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // if (!token) return <>Require Token Storage</>;
  const userLoginId = await funGetUserIdByToken();

  return (
    <RootStyleRegistry>
      {/* <MqttLoader />
      <TokenProvider token={token} envObject={envObject} /> */}
      <RealtimeProvider userLoginId={userLoginId as string} />
      {children}
    </RootStyleRegistry>
  );
}
