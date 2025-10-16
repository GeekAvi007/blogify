import dotenv from 'dotenv'
import connectDB from './src/config/db/js'
import app from './src/app.js'

dotenv.config();

const PORT = process.env.PORT || 5000;

await connectDB();

app.listen('/',()=> console.log(`Server listening at PORT: ${PORT}`))