import express from 'express';
import mongoose from 'mongoose';
import dashboardRouter from './routes/dashboard.js';
import userRouter from './routes/user.js';
import studentRouter from './routes/student.js';
import progressRouter from './routes/progress.js';
import notificationRouter from './routes/notification.js';



import cors from 'cors'

await mongoose.connect(process.env.MONGO_URI);

const app = express();

app.use(express.json())
app.use(cors())

app.use(userRouter)
app.use(dashboardRouter)
app.use('/api/students', studentRouter);
app.use('/api/progress', progressRouter);
app.use('/api/notifications', notificationRouter);

const PORT = 3006

app.listen(PORT, () => {
     console.log(`App is listening on server ${PORT}`)
})










