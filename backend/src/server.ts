import express from "express"
import cors from 'cors'
import { rota } from "./rotas"

const app = express()
app.use(express.json())
app.use(cors())
app.use(rota)

app.listen(3000, ()=> console.log('Servidor rodando!!'))