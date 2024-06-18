import jwt from "jsonwebtoken";
import { secretKey } from "../../secret";

export const generateToken = (user: any) => {
  const payload = {
    id: user.id,
    email: user.email,
  };
  return jwt.sign(payload, secretKey, { expiresIn: "1h" });
};
