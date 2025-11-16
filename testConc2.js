const crypto = require("crypto");

fetch("https://api.github.com/users/navkant").then((response) => {
  response.json().then((data) => {
    console.log("data1:", data.id);
  });
});

crypto.pbkdf2("password", "salt", 5000000, 70, "sha512", (err, key) => {
  console.log("1 - cryptopdkdf2 done");
});

crypto.pbkdf2("password", "salt", 5000000, 70, "sha512", (err, key) => {
  console.log("2 - cryptopdkdf2 done");
});

crypto.pbkdf2("password", "salt", 5000000, 70, "sha512", (err, key) => {
  console.log("3 - cryptopdkdf2 done");
});

crypto.pbkdf2("password", "salt", 5000000, 70, "sha512", (err, key) => {
  console.log("4 - cryptopdkdf2 done");
});

crypto.pbkdf2("password", "salt", 5000000, 70, "sha512", (err, key) => {
  console.log("5 - cryptopdkdf2 done");
});
