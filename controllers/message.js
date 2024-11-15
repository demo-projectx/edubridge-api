import { MessageModel } from "../models/message.js";

// Send a new message
export const sendMessage = async (req, res, next) => {
    const url =`https://smsc.hubtel.com/v1/messages/send?clientsecret=${Client_id}&clientid=evsapkni&from=LearnLink&to=233550194328&content=This+Is+A+Test+Message`
    try {
        const { receiverId, content } = req.body;
        const message = new Message({
            sender: req.auth.id,
            receiver: receiverId,
            content
        });
        await message.save();
        res.status(201).json({ message: 'Message sent successfully', data: message });
    } catch (error) {
        next(error);
    }
};

// Retrieve messages between two users
export const getMessages = async (req, res, next) => {
    try {
        const { userId } = req.params; // The ID of the user you're communicating with
        const messages = await Message.find({
            $or: [
                { sender: req.auth.id, receiver: userId },
                { sender: userId, receiver: req.auth.id }
            ]
        }).sort({ timestamp: 1 }); // Sorted by timestamp
        res.status(200).json(messages);
    } catch (error) {
        next(error);
    }
};

// Mark message as read
export const markMessageAsRead = async (req, res, next) => {
    try {
        const { messageId } = req.params;
        await Message.findByIdAndUpdate(messageId, { isRead: true });
        res.status(200).json({ message: 'Message marked as read' });
    } catch (error) {
        next(error);
    }
};
