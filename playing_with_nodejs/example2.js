const fs = require("fs");

const a = 100;

setImmediate(() => console.log("setImmediate"));
Promise.resolve("Promise").then(console.log);

fs.readFile("./file.txt", "utf-8", () => console.log("File Reading CB"));

setTimeout(() => console.log("Timer expired"), 0);

process.nextTick(() => console.log("process nexttick"));

function printA() {
  console.log("a=", a);
}

printA();

console.log("Last line of the file");

// a=100
// last line
// next tick
// promise
// timer
// file rading cb
