import "dotenv/config";
const dotenv = require("dotenv").config(".env");
const PwdCookies = dotenv?.parsed.PWD;

export { PwdCookies };
