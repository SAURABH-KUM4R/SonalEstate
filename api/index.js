import express from 'express';
import dotenv from 'dotenv';
import connectToDb from './config/connectionToDB.js';
import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import listingRouter from './routes/listing.routes.js'
import cookieParser from 'cookie-parser';
import path from 'path';

dotenv.config();

const __dirname = path.resolve();

const app = express();

app.use(express.json()); // It's allow us to send req in form of JSON to server before we are not allowed.

app.use(cookieParser()); // It's gives us cookie access from client side.

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    connectToDb();
    console.log('Server is running on port: ' + PORT);
})

app.use('/api/user', userRouter)
app.use('/api/auth', authRouter)
app.use('/api/listing', listingRouter)

app.use(express.static(path.join(__dirname, '/client/dist')))

app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
})
