import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  status: { type: String, enum: ['Present', 'Absent'], required: true }
});

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  grade: { type: String },
  progress: { type: String, default: "" },
  attendance: [attendanceSchema],
  studentId: { type: String, required: true },
  email: {type: String, required: true, unique:true},

});

const StudentModel = mongoose.model('Student', studentSchema);
export default StudentModel;
