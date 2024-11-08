import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  status: { type: String, enum: ['Present', 'Absent'], required: true }
});

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  grade: { type: String, required: true },
  progress: { type: String, default: "" },
  attendance: [attendanceSchema]
});

const StudentModel = mongoose.model('Student', studentSchema);
export default StudentModel;
