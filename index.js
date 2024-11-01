import express from 'express';
import mongoose from 'mongoose';
//import productRouter from './routes/product.js';
import userRouter from './routes/user.js';
import cors from 'cors'
//import categoryRouter from './routes/category.js';

await mongoose.connect(process.env.MONGO_URI);

const app = express();

app.use(express.json())
app.use(cors())

app.use(userRouter)
//app.use(categoryRouter)

const PORT = 3006

app.listen(PORT, () => {
     console.log(`App is listening on server ${PORT}`)
})
