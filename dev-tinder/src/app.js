import express from "express";
import connectDb from "./config/database.js";
import User from "./models/user.js";
import { ObjectId } from "mongodb";

const app = express();
app.use(express.json());
const PORT = 3000;

app.post("/signup", async (req, res) => {
    const newUser = new User(req.body);
    try {
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
    } catch (err) {
        console.log(`err: ${err}`);
        res.status(400).send(`could not create user: ${err}`);
    }
});

app.get("/users", async (req, res) => {
    const userDbList = await User.find({});
    const userList = userDbList.map((user, index) => {
        return {
            id: user._id,
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

app.get("/users/:emailId", async (req, res) => {
    const user = await User.findOne({
        emailId: req.params.emailId,
    });
    res.send({
        message: "success",
        status: 0,
        user: {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
        },
    });
});

app.delete("/users", async (req, res) => {
    console.log("delete api called", req.query.userId);
    const resp = await User.findByIdAndDelete(req.query.userId);
    console.log(resp);
    res.send({
        message: "success",
        status: 0,
    });
});

app.patch("/users", async (req, res) => {
    console.log("patch api called");
    const body = req.body;
    const UPDATE_ALLOWED_FIELDS = ["lastName", "age", "gender"];
    const isUpdateAllowed = Object.keys(body).every((key) =>
        UPDATE_ALLOWED_FIELDS.includes(key)
    );
    if (!isUpdateAllowed) {
        res.status(400).send({ message: "you cannot update this field" });
        return;
    }
    try {
        const resp = await User.findByIdAndUpdate(req.query.userId, body, {
            returnDocument: "after",
        });
        if (!resp) {
            res.status(400).send(`User doesnt exists: ${req.query.userId}`);
            return;
        }
        res.send({
            message: "success ",
            status: "0",
            user: {
                firstName: resp.firstName,
                lastName: resp.lastName,
                emailId: resp.emailId,
            },
        });
    } catch (err) {
        console.log(`"error occured while updating user: ${err}`);
        res.status(400).send(`Could not update user: ${err}`);
    }
});

app.patch("/users/update-many", async (req, res) => {
    console.log(
        `update many called for ${req.query.emailId} ${JSON.stringify(
            req.body
        )}`
    );

    const resp = await User.updateMany(
        { emailId: req.query.emailId },
        req.body
    );
    console.log(`update many response: ${resp}`);

    res.send({
        message: "updated many successfull",
        status: 0,
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
