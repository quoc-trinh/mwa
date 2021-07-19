const child_process = require("child_process");

console.log("1. Start the application");

child_process.spawn("node", ["./fib30.js"], { stdio: "inherit" });
child_process.spawn("node", ["./fib-10.js"], { stdio: "inherit" });

console.log("2. End the application");