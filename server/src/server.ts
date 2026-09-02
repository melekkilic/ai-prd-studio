import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import projectRoutes from './routes/projectRoutes.js'
import healthRoutes from './routes/healthRoutes.js'
import aiRoutes from './routes/aiRoutes.js'
import prdRoutes from './routes/prdRoutes.js'

dotenv.config()

const app = express()

app.use(
  cors({
    origin: 'http://localhost:5173',
  }),
)

app.use(express.json())

const PORT = process.env.PORT || 3001
app.use('/api/ai', aiRoutes)
app.use('/api/health', healthRoutes)
app.use('/api/projects', projectRoutes)
app.use('/api/prd', prdRoutes)
app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`)
})