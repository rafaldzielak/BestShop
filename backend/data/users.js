import bcrypt from "bcryptjs";

const users = [
  { name: "Admin", email: "admin@example.com", password: bcrypt.hashSync("123", 10), isAdmin: true },
  { name: "Joe Doe", email: "joe@example.com", password: bcrypt.hashSync("123", 10) },
  { name: "Jane Doe", email: "jane@example.com", password: bcrypt.hashSync("123", 10) },
];

export default users;
