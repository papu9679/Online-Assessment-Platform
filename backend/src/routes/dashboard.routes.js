import express from "express";

import { verifyToken } from "../middlewares/verify.middleware.js";

import { getOverview, getAnalytics, getAdminOverview } from "../controllers/dashboard.controller.js";
import { requireRole } from "../middlewares/role.middleware.js";

// api/dashboard
const router = express.Router();

// Protect all dashboard routes
router.use(verifyToken);

// GET /api/dashboard/overview
router.get("/overview", getOverview);

// GET /api/dashboard/analytics
router.get("/analytics", getAnalytics);

router.get("/admin-overview", requireRole("ADMIN"), getAdminOverview);

export default router;