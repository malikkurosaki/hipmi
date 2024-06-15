"use server";
import yaml from "yaml";
import fs from "fs";
import path from "path";
const config: { server: { password: string } } = yaml.parse(
  fs.readFileSync(path.join(__dirname, "./../../../config.yaml")).toString()
);

export async function getConfig() {
  return config;
}
