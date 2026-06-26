import jwt from "jsonwebtoken";

export const createToken = (userId) => {
    return jwt.sign({ userId }, "secret123", { expiresIn: "7d" });
};