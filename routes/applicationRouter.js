import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  employerGetAllApplications,
  jobSeekerDeleteApplication,
  jobSeekerGetAllApplications,
  postApplication,
} from "../controllers/applicationController.js";

const router = express.Router();

router.get("/employer/getall", isAuthenticated, employerGetAllApplications);
router.get("/jobseeker/getall", isAuthenticated, jobSeekerGetAllApplications);
router.delete("/delete/:id", isAuthenticated, jobSeekerDeleteApplication);
router.post("/post", isAuthenticated, postApplication);

export default router;
