import User from "../models/user.model.js";

export const requireRole = (...roles) => async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("role");

    if (!user || !roles.includes(user.role)) {
      return res.status(403).json({
        success: false,
        message: "You do not have permission to access this resource",
      });
    }

    req.userRole = user.role;
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to verify user role",
    });
  }
};
