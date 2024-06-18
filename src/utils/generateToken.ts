import jwt from "jsonwebtoken";
import { secretKey } from "../../secret";

export const generateToken = (id: string, email: string) => {
  const payload = {
    id: id,
    email: email,
  };
  return jwt.sign(payload, secretKey, { expiresIn: "1h" });
};
