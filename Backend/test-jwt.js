import jwt from "jsonwebtoken";
const token = jwt.sign({ userId: "123456789012345678901234" }, "secret");
console.log(token);
