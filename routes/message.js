import express from 'express';
import { sendMessage, getMessages, markMessageAsRead } from '../controllers/message.js';
import isAuthenticated from '../middlewares/auth.js';

const messageRouter = express.Router();

messageRouter.post('/messages', isAuthenticated, sendMessage); // Send a new message
messageRouter.get('/messages', isAuthenticated, getMessages); // Get conversation with a user
messageRouter.patch('/messages/:id', isAuthenticated, markMessageAsRead); // Mark message as read

export default messageRouter;
