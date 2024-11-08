import { Router } from "express";
import { getTeacherDashboard, getStudentDashboard, getParentDashboard } from '../controllers/dashboard.js';
import isAuthenticated from '../middlewares/auth.js';

const dashboardRouter = Router();

dashboardRouter.get('/teacher', isAuthenticated, getTeacherDashboard);
dashboardRouter.get('/parent', isAuthenticated, getParentDashboard);
dashboardRouter.get('/student', isAuthenticated, getStudentDashboard);

dashboardRouter.get('/overview');

export default dashboardRouter;
