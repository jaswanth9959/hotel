import bcrypt from "bcryptjs";

const staff = [
  {
    firstName: "admin",
    lastName: "user",
    email: "admin@gmail.com",
    ssn: "12345678",
    phone: "1234567890",
    role: "admin",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    firstName: "staff",
    lastName: "user",
    email: "staff@gmail.com",
    ssn: "12345679",
    phone: "1234567890",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default staff;
