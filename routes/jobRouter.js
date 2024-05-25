import express from 'express'
import { deleteJob, getAllJobs, getMyJobs, getSingleJob, postJobs, updateJob } from '../controllers/jobController.js'
import { isAuthenticated } from '../middlewares/auth.js'

const router = express.Router()

router.get('/alljobs',getAllJobs)
router.post('/post',isAuthenticated,postJobs)
router.get('/getmyjobs',isAuthenticated,getMyJobs)
router.put("/update/:id",isAuthenticated,updateJob)
router.delete("/delete/:id",isAuthenticated,deleteJob)
router.get("/:id",isAuthenticated,getSingleJob)


export default router