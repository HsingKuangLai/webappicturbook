import {
  createMember,
  getMembers,
  getFavorite,
  getTargetMembers,
  getMemberdata,
  updateMember,
  updateMemberData,
  deleteMember,
  deleteMemberdata
} from "../controllers/member.js";
import express from "express";

// Create an express router
const router = express.Router();

// Every path we define here will get /api/members prefix
// To make code even more cleaner we can wrap functions in `./controllers` folder

// GET /api/members
router.get("/", getMembers);
// GET /api/members
router.get("/target", getTargetMembers);
// GET /api/members
router.get("/favorite", getFavorite);
// GET /api/members
router.get("/memberdata", getMemberdata);
// POST /api/members
router.post("/", createMember);
// PUT /api/members/:id
router.put("/", updateMember);
// PUT /api/members/:id
router.put("/memberdata", updateMemberData);
// DELETE /api/members/:id
router.delete("/target", deleteMember);
// DELETE /api/members/:id
router.delete("/memberdata", deleteMemberdata);

// export the router
export default router;
