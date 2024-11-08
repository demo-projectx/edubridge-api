import express from 'express';
import { getStudentProfile, updateStudentProgress, getStudentAttendance, logStudentAttendance } from '../controllers/student.js';
import isAuthenticated from '../middlewares/auth.js';

const studentRouter = express.Router();

// Define routes for student operations
studentRouter.get('/:id/profile', isAuthenticated, getStudentProfile);
studentRouter.put('/:id/progress', isAuthenticated, updateStudentProgress);
studentRouter.get('/:id/attendance', isAuthenticated, getStudentAttendance);
studentRouter.post('/:id/attendance', isAuthenticated, logStudentAttendance);

export default studentRouter;
