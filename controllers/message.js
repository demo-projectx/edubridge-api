import axios from 'axios';
import { MessageModel } from '../models/message.js'; // Adjust path as per your project structure
import { UserModel } from '../models/user.js'; // Assuming you have a User model


// SMS Sending Service
const sendSMS = async (phone, messageContent) => {
  const clientId = process.env.CLIENT_ID;
  const clientSecret = process.env.CLIENT_SECRET;
  const from = process.env.SENDER_ID;

  const url = `https://smsc.hubtel.com/v1/messages/send?clientid=${clientId}&clientsecret=${clientSecret}&from=${from}&to=${phone}&content=${encodeURIComponent(messageContent)}`;

  try {
    const response = await axios.get(url);
    console.log('SMS Response:', response.data); // Log for debugging
    return response.data;
  } catch (error) {
    console.error('Error sending SMS:', error.response?.data || error.message);
    throw new Error('Failed to send SMS');
  }
};



export const sendMessage = async (req, res, next) => {
  try {
    const { receiverIds, content } = req.body;
    const senderId = req.auth.id;

    console.log('Message request received:', { receiverIds, content, senderId });

    if (!receiverIds || !Array.isArray(receiverIds) || receiverIds.length === 0) {
      console.log('Validation failed: No receiver IDs provided');
      return res.status(400).json({ message: 'Receiver IDs are required' });
    }

    if (!content || content.trim() === '') {
      console.log('Validation failed: Empty message content');
      return res.status(400).json({ message: 'Message content cannot be empty' });
    }

    const sender = await UserModel.findById(senderId);
    if (!sender || sender.role !== 'Teacher') {
      console.log('Unauthorized sender:', senderId);
      return res.status(403).json({ message: 'Only teachers can send SMS messages' });
    }

    console.log('Sender validated:', sender);

    const results = [];
    for (const receiverId of receiverIds) {
      console.log('Processing receiver ID:', receiverId);

      const receiver = await UserModel.findById(receiverId);
      if (!receiver) {
        console.log('Receiver not found:', receiverId);
        results.push({ receiverId, status: 'Failed', error: 'Receiver not found' });
        continue;
      }

      if (receiver.role !== 'Parent') {
        console.log('Receiver is not a Parent:', receiverId);
        results.push({ receiverId, status: 'Failed', error: 'Only parents can receive SMS' });
        continue;
      }

      if (!receiver.phone) {
        console.log('Receiver has no phone number:', receiverId);
        results.push({ receiverId, status: 'Failed', error: 'Parent has no registered phone number' });
        continue;
      }

      try {
        const smsContent = `Message from ${sender.name || 'Teacher'}: "${content}"`;
        console.log('Sending SMS:', { phone: receiver.phone, smsContent });

        await sendSMS(receiver.phone, smsContent);
        results.push({ receiverId, status: 'Success' });

        const message = new MessageModel({
          sender: senderId,
          receiver: receiverId,
          content,
        });
        await message.save();

        console.log('Message saved to DB for receiver:', receiverId);
      } catch (error) {
        console.error('Error sending SMS to receiver:', receiverId, error.message);
        results.push({ receiverId, status: 'Failed', error: error.message });
      }
    }

    console.log('Final results:', results);
    res.status(200).json({ message: 'Messages processed', results });
  } catch (error) {
    console.error('Unexpected error in sendMessage:', error.message);
    next(error);
  }
};


// Controller: Retrieve messages between two users
export const getMessages = async (req, res, next) => {
  try {
    const { userId } = req.params; // The ID of the user you're communicating with
    const messages = await MessageModel.find({
      $or: [
        { sender: req.auth.id, receiver: userId },
        { sender: userId, receiver: req.auth.id },
      ],
    }).sort({ timestamp: 1 }); // Sorted by timestamp

    res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
};

// Controller: Mark a message as read
export const markMessageAsRead = async (req, res, next) => {
  try {
    const { messageId } = req.params;
    await MessageModel.findByIdAndUpdate(messageId, { isRead: true });
    res.status(200).json({ message: 'Message marked as read' });
  } catch (error) {
    next(error);
  }
};
