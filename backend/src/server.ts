import express, { NextFunction, Request, Response } from "express"
import 'express-async-errors'
import cors from 'cors'
import { rota } from "./rotas"



const app = express()//Defininfo a variavel app com a função express
app.use(express.json())//Definindo modelo Json
app.use(cors())//Ativando Cors para requisições HTTP
app.use(rota)//Definindo rota

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof Error) {
        //Se for uma instancia do tipo error
        return res.status(400).json({
            error: err.message
        })
    }

    return res.status(500).json({
        status: 'error',
        message: 'Internal server error.'
    })

})

//Definindo a porta 3001
app.listen(3001, ()=> console.log('Servidor rodando!!'))