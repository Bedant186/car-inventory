export class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    async register(req, res) {
        try {
            const { email, password, role } = req.body;
            const result = await this.authService.register(email, password, role);
            return res.status(201).json(result);
        }
        catch (error) {
            return res.status(400).json({ message: error.message || "Registration failed" });
        }
    }
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const result = await this.authService.login(email, password);
            return res.status(200).json(result);
        }
        catch (error) {
            return res.status(401).json({ message: error.message || "Authentication failed" });
        }
    }
}
//# sourceMappingURL=AuthController.js.map