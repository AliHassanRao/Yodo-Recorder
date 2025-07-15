import jwt from "jsonwebtoken";

const { ACCESS_TOKEN_SECRET } = process.env;

export const createAccessToken = (payload) => {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET);
};
