import express from 'express';
import morgan from 'morgan';
import connectDB from './db/db.js';
connectDB();
import userRoutes from './routes/user.routes.js'
import projectRoutes from './routes/project.routes.js'
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());    
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/user', userRoutes)
app.use('/projects', projectRoutes)

app.get('/', (req, res) => {
    res.send('Hello World!');
});

export default app;