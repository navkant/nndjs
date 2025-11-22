import express from "express";
import connectDb from "./config/database.js";
import User from "./models/user.js";

const app = express();
app.use(express.json());
const PORT = 3000;

app.post("/signup", async (req, res) => {
  const newUser = new User(req.body);
  const newDbUser = await newUser.save();

  res.send({
    message: "success",
    status: 0,
    user: {
      firstName: newDbUser.firstName,
      lastName: newDbUser.lastName,
      emailId: newDbUser.emailId,
      password: newDbUser.password,
      id: newDbUser._id,
    },
  });
});

app.get("/users/:firstName", async (req, res) => {
  const userDbList = await User.find({
    firstName: { $regex: new RegExp(req.params.firstName, "i") },
  });
  const userList = userDbList.map((user, index) => {
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      emailId: user.emailId,
      password: user.password,
    };
  });
  res.send({
    message: "success",
    status: 0,
    userList: userList,
  });
});

connectDb()
  .then(() => {
    console.log("Connected to db server successfulyy");
    app.listen(PORT, () => {
      console.log(`express server listening at ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Could not connect to db server ${err}`);
  });
