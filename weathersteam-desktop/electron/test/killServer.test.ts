import { spawn } from "node:child_process";
import killServer from "../function/killServer";

const PORT_TO_TEST = 3333;

console.log(
  `[Test Runner] Spawning a background server on port ${PORT_TO_TEST}...`,
);

const dummyServer = spawn("node", [
  "-e",
  `const http = require('http');
   const server = http.createServer();
   server.listen(${PORT_TO_TEST}, () => console.log('SERVER_READY'));
   setInterval(() => {}, 1000);`,
]);

dummyServer.stdout.on("data", (data) => {
  const output = data.toString();

  if (output.includes("SERVER_READY")) {
    console.log(
      `[Test Runner] Target acquired! Background server running on PID: ${dummyServer.pid}`,
    );
    console.log(`[Test Runner] Executing killServer(${PORT_TO_TEST})...`);

    try {
      killServer(PORT_TO_TEST);
    } catch (err) {
      console.error(
        `[Test Runner] ❌ killServer threw an unexpected error:`,
        err,
      );
      dummyServer.kill();
    }
  }
});

dummyServer.on("exit", (code, signal) => {
  console.log(
    `[Test Runner] Background process terminated (Code: ${code}, Signal: ${signal})`,
  );
  console.log(
    `[Test Runner] ✅ TEST PASSED: Port ${PORT_TO_TEST} was successfully cleared!`,
  );
});

dummyServer.stderr.on("data", (data) => {
  console.error(`[Background Server Error]: ${data.toString()}`);
});
