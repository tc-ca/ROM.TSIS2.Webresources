import typescript from "@rollup/plugin-typescript";
import cleanup from "rollup-plugin-cleanup";
import multiInput from "rollup-plugin-multi-input";

export default {
  input: ['src/*.ts'],
  output: {
    dir: "Webresources/js",
    format: "cjs",
    name: "main",
  },
  plugins: [
    multiInput(),
    typescript({
      tsconfig: false
    }),
    cleanup({
      extensions: ['ts', 'js']
    }),
  ],
};