import jwt from "jsonwebtoken";
const SECRET = process.env.JWT_SECRET || "incubyte-secret";
export function generateToken(id, email) {
    return jwt.sign({
        id,
        email,
    }, SECRET, {
        expiresIn: "1d",
    });
}
//# sourceMappingURL=jwt.js.map