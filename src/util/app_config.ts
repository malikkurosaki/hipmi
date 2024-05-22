import os from "os";

const app_config = {
  title: "Example Title",
  description: "Example Description",
  host:
    os.platform() === "darwin"
      ? "http://localhost:3000"
      : "https://test-hipmi.wibudev.com",
  isLocal: os.platform() === "darwin",
};

export default app_config;
