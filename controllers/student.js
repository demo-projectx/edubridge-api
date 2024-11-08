import StudentModel from '../models/student.js';

// Get student profile
export const getStudentProfile = async (req, res, next) => {
  try {
    const student = await StudentModel.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(student);
  } catch (error) {
    next(error);
  }
};

// Update student progress
export const updateStudentProgress = async (req, res, next) => {
  try {
    const { progressData } = req.body;
    const student = await StudentModel.findByIdAndUpdate(
      req.params.id,
      { $set: { progress: progressData } },
      { new: true }
    );
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(student);
  } catch (error) {
    next(error);
  }
};

// Get student attendance
export const getStudentAttendance = async (req, res, next) => {
  try {
    const student = await StudentModel.findById(req.params.id).select('attendance');
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(student.attendance);
  } catch (error) {
    next(error);
  }
};

// Log student attendance
export const logStudentAttendance = async (req, res, next) => {
  try {
    const { date, status } = req.body;
    const student = await StudentModel.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Add a new attendance entry
    student.attendance.push({ date, status });
    await student.save();

    res.json({ message: "Attendance logged successfully", attendance: student.attendance });
  } catch (error) {
    next(error);
  }
};
