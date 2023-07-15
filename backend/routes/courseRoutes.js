import express from 'express'
import { getAllCoures,createCourse } from '../controllers/courseController.js';

const router=express.Router();

router.route("/courses").get(getAllCoures);
router.route("/createcourse").post(createCourse);



export default router;