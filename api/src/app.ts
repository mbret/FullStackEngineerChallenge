import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { register as regiterRoutes } from './routes'

const app = express()
const port = 3000

/**
 * - Cors with an origin of * for easier development
 * - body parser middleware in order to handle json body for POST/PUT requests
 */
app.use(cors())
app.use(bodyParser.json())

regiterRoutes(app)

app.listen(port)