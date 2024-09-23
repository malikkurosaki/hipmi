import { ServerEnv } from "../lib/server_env";
import { RealtimePage } from "./_ui/RealtimePage";
const env = process.env;
const WIBU_REALTIME_KEY = process.env.WIBU_REALTIME_KEY;

export default function App() {
  return (
    <div>
      {/* <pre>{JSON.stringify(env, null, 2)}</pre>
      <pre>{JSON.stringify(ServerEnv.value, null, 2)}</pre> */}
      <RealtimePage token={WIBU_REALTIME_KEY as string} />
    </div>
  );
}
