import { ServerEnv } from "../lib/server_env";

export default function App() {
  return (
    <div>
      <pre>{JSON.stringify(ServerEnv.value, null, 2)}</pre>
    </div>
  );
}
