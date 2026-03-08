const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    let token;
    if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.slice("Bearer ".length).trim();
    }

    if (!token && req.headers["x-auth-token"]) {
        token = String(req.headers["x-auth-token"]).trim();
    }

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Authorization token is missing",
        });
    }

    if (!process.env.JWT_SECRET) {
        return res.status(500).json({
            success: false,
            message: "JWT_SECRET is not configured",
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {
            id: decoded.id,
            role: decoded.role,
        };
        return next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
}

module.exports = authMiddleware;
