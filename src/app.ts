import express from 'express'
import cors from 'cors'
import logger from 'morgan'
import { connectToMongoDB } from './config/db'
import { contactsRouter } from './routes/contacts'

connectToMongoDB()

export const app = express()
app.use(cors())
app.use(logger('dev'))
app.use(express.json())

app.use('/contacts', contactsRouter)

app.get('/', (req, res) => res.send('Contact Book API'))
