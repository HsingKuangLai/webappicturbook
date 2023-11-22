import {
  createMember,
  getMembers,
  updateMember,
  deleteMember,
} from "../controllers/member.js";
import express from "express";

// Create an express router
const router = express.Router();

// Every path we define here will get /api/todos prefix
// To make code even more cleaner we can wrap functions in `./controllers` folder

// GET /api/todos
router.get("/", getMembers);
// POST /api/todos
router.post("/", createMember);
// PUT /api/todos/:id
router.put("/:id", updateMember);
// DELETE /api/todos/:id
router.delete("/:id", deleteMember);

// export the router
export default router;
