import express from 'express';
import { getNotifications, markAsRead } from '../controllers/notification.js';
import isAuthenticated from '../middlewares/auth.js';

const notificationRouter = express.Router();

notificationRouter.get('/:userId', isAuthenticated, getNotifications);
notificationRouter.put('/:notificationId/read', isAuthenticated, markAsRead);

export default notificationRouter;
