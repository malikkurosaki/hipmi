import mqtt from "mqtt";

declare global {
  var mqtt_client: mqtt.MqttClient;
}

const mqtt_client =
  globalThis.mqtt_client || mqtt.connect("ws://wibudev.com:3003");

export default mqtt_client;
