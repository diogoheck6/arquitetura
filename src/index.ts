import dotenv from 'dotenv'
dotenv.config()

import express from 'express'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const porta = process.env.PORTA ?? 3001
app.listen(porta, () => {
	console.log(`🔥 Servidor rodando na porta ${porta}`)
})
