export const requireAdmin = (req, res, next) => {
    // Assuming user payload was attached to req.user by auth middleware
    const user = req.user;
    if (!user || user.role !== "ADMIN") {
        return res.status(403).json({ message: "Access denied. Admin role required." });
    }
    next();
};
export default requireAdmin;
//# sourceMappingURL=admin.js.map