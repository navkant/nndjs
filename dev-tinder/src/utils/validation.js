import validator from "validator";

const validateSignupData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Name not valid");
  } else if (firstName.length < 4 || firstName.length > 50) {
    throw new Error("Name length should be more than 4 and less than 50");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("EMail is is not valid");
  } else if (!validator.isStrongPassword(password)) {
    return new Error("Pasword is not strong");
  }
};

export default validateSignupData;
