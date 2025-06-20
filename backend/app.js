import express from 'express';
import dotenv from 'dotenv';
import routes from './routes/index.js';
import './config/db.js'; 
import { connectDB } from './config/db.js';
import cors from 'cors'

dotenv.config();

const app = express();

connectDB()

app.use(cors())
app.use(express.json());
app.use('/api', routes);


export default app;
