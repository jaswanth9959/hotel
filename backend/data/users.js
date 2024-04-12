import bcrypt from "bcryptjs";

const users = [
  {
    firstName: "user",
    lastName: "1",
    email: "john@gmail.com",
    phone: "1234567890",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    firstName: "user",
    lastName: "2",
    email: "jane@gmail.com",
    phone: "1234567890",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
