import mqtt from "mqtt";

declare global {
  var mqtt_client: mqtt.MqttClient;
}

const mqtt_client =
  globalThis.mqtt_client || mqtt.connect("wss://io.wibudev.com");

export default mqtt_client;
