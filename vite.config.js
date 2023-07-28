import path from "path";
import { defineConfig } from "vite";
import packageJson from "./package.json";

const getPackageName = () => {
  return packageJson.name;
};

import _config from './_config.js';

const HOST = _config.server.host;
const PORT = _config.server.port;

const getPackageNameCamelCase = () => {
  try {
    return getPackageName().replace(/-./g, (char) => char[1].toUpperCase());
  } catch (err) {
    throw new Error("Name property in package.json is missing.");
  }
};

const fileName = {
  es: `${getPackageName()}.mjs`,
  cjs: `${getPackageName()}.cjs`,
  iife: `${getPackageName()}.iife.js`,
};

const formats = Object.keys(fileName);

export default defineConfig({
    server: {
        host: HOST,
        port: PORT
        },
  base: "./",
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/js/index.js"),
      name: getPackageNameCamelCase(),
      formats,
      fileName: (format) => fileName[format],
    },
  },
  test: {},
});
