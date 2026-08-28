import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import projectRoutes from './routes/projectRoutes.js'
import healthRoutes from './routes/healthRoutes.js'

dotenv.config()

const app = express()

app.use(
  cors({
    origin: 'http://localhost:5173',
  }),
)

app.use(express.json())

const PORT = process.env.PORT || 3001

app.use('/api/health', healthRoutes)
app.use('/api/projects', projectRoutes)
app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`)
})