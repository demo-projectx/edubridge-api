import Notification from '../models/notification.js';

export const getNotifications = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const notifications = await Notification.find({ user: userId });
        res.status(200).json(notifications);
    } catch (error) {
        next(error);
    }
};

export const createProgressNotification = async (userId, message) => {
    try {
        const newNotification = new Notification({
            user: userId,
            message,
            date: new Date(),
            isRead: false,
        });
        await newNotification.save();
    } catch (error) {
        console.error("Error creating notification:", error);
    }
};

export const markAsRead = async (req, res, next) => {
    try {
        const { notificationId } = req.params;
        const updatedNotification = await Notification.findByIdAndUpdate(notificationId, { isRead: true });
        res.status(200).json(updatedNotification);
    } catch (error) {
        next(error);
    }
};
