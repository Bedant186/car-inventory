import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_key";
export class AuthService {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async register(email, password, role = "USER") {
        if (!email || !password) {
            throw new Error("Email and password are required");
        }
        const existingUser = await this.userRepository.findByEmail(email);
        if (existingUser) {
            throw new Error("User with this email already exists");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await this.userRepository.create({
            email,
            password: hashedPassword,
            role,
        });
        const token = jwt.sign({ id: newUser.id, role: newUser.role }, JWT_SECRET, { expiresIn: "1d" });
        return {
            user: { id: newUser.id, email: newUser.email, role: newUser.role },
            token,
        };
    }
    async login(email, password) {
        if (!email || !password) {
            throw new Error("Email and password are required");
        }
        const user = await this.userRepository.findByEmail(email);
        if (!user || !user.password) {
            throw new Error("Invalid email or password");
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error("Invalid email or password");
        }
        const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: "1d" });
        return {
            user: { id: user.id, email: user.email, role: user.role },
            token,
        };
    }
}
//# sourceMappingURL=AuthService.js.map