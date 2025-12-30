import jwt from "jsonwebtoken";
import User from "../models/user.js";

const auth = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).send("Unauthorized");
  }
  const decodedObj = jwt.verify(token, "secret");
  const { id } = decodedObj;
  const user = await User.findById(id);

  if (!user) {
    return res.status(401).send("Unauthorized");
  }

  req.user = user;
  next();
};

export default auth;
