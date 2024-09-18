type ENV = {
  DATABASE_URL: string;
  WIBU_PWD: string;
  Client_KEY: string;
  Server_KEY: string;
  MAPBOX_TOKEN: string;
  WS_APIKEY: string;
};
export class ServerEnv {
  static value: ENV | null = null;

  static set(val: ENV) {
    ServerEnv.value = val;
  }
}
