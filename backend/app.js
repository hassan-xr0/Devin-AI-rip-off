import express from 'express';
import morgan from 'morgan';
import connectDB from './db/db.js';
connectDB();
import userRoutes from './routes/user.routes.js'
import cookieParser from 'cookie-parser';

const app = express();

app.use(morgan('dev'));
app.use(express.json());    
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/user', userRoutes)

app.get('/', (req, res) => {
    res.send('Hello World!');
});

export default app;