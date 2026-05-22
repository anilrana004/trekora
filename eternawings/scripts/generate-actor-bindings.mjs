/**
 * Regenerates TypeScript actor bindings from the Motoko canister .did file.
 * Requires the Candid bindgen CLI on your PATH (same tool as before this wrapper).
 */
import { spawnSync } from "node:child_process";

const args = [
  "--did-file",
  "./src/backend/dist/backend.did",
  "--out-dir",
  "./src/frontend/src",
  "--actor-interface-file",
  "--force",
];

const result = spawnSync("caffeine-bindgen", args, {
  stdio: "inherit",
  shell: true,
});

process.exit(result.status === null ? 1 : result.status);
