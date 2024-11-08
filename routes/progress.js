import express from 'express';
import { getProgress, updateProgress, getClassProgressSummary, analyzeProgress } from '../controllers/progress.js';
import isAuthenticated from '../middlewares/auth.js';

const progressRouter = express.Router();

progressRouter.get('/:studentId', isAuthenticated, getProgress);
progressRouter.put('/:studentId', isAuthenticated, updateProgress);
progressRouter.get('/class/:classId', isAuthenticated, getClassProgressSummary);
progressRouter.get('/analyze/:studentId', isAuthenticated, analyzeProgress);

export default progressRouter;
