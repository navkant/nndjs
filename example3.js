const fs = require("fs");

setImmediate(() => console.log("setImmediate"));

setTimeout(() => console.log("Timer expired"), 0);

Promise.resolve("promise").then(console.log);

fs.readFile("./file.txt", "utf-8", () => {
  setTimeout(() => console.log("2nd timer"), 0);

  process.nextTick(() => console.log("2nd next tick"));
  setImmediate(() => console.log("2nd setImmediate"));
  console.log("File reading CB");
});

process.nextTick(() => console.log("process.nextTick"));
console.log("last line of the code");

// last line of the code
// first tick
// promise
// timer expired
// 1sst set Immediate
// file reading cb
// 2nd tick
// 2nd timer
// 2nd immediate
