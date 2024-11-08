import Progress from '../models/progress.js';
import { createProgressNotification } from '../controllers/notification.js';


export const getProgress = async (req, res, next) => {
    try {
        const { studentId } = req.params;
        const progress = await Progress.findOne({ student: studentId });
        res.status(200).json(progress);
    } catch (error) {
        next(error);
    }
};

export const updateProgress = async (req, res, next) => {
    try {
        const { studentId } = req.params;
        const updatedProgress = await Progress.findByIdAndUpdate(studentId, req.body, { new: true });

        await createProgressNotification(studentId, "Your progress has been updated.");

        res.status(200).json(updatedProgress);
    } catch (error) {
        next(error);
    }
};

export const getClassProgressSummary = async (req, res, next) => {
    // Implement fetching and summarizing class progress
};

export const analyzeProgress = async (req, res, next) => {
    // Implement analysis of progress trends
};



