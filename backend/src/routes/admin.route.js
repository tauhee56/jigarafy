import express from "express";
import { protectRoute, adminOnly } from "../middleware/auth.middleware.js";
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getDashboardStats
} from "../controllers/admin.controller.js";

const router = express.Router();

// Apply auth middleware to all routes
router.use(protectRoute);
// Apply admin-only middleware to all routes
router.use(adminOnly);

// Admin dashboard stats
router.get("/dashboard", getDashboardStats);

// User management
router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

export default router;
