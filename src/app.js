import express from 'express'
import cors from 'cors'
import morgan from 'morgan'

import authRoutes from '../src/routes/authRoutes.js'
import blogRoutes from '../src/routes/blogRoutes.js'

const app = express();

app.use(express.json())
app.use(cors());
app.use(morgan('dev'))

app.use('/api/auth', authRoutes)
app.use('/api/blogs', blogRoutes)

export default app;