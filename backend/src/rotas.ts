import { Router } from "express";
import { getUserController } from "./Controlller/User/getUserController";
import { postUserController } from "./Controlller/User/postUserController";
import { getTransacaoController } from "./Controlller/Transacao/getTransacaoController";
import { postTransacaoController } from "./Controlller/Transacao/postTransacaoController";
import { deleteTransacaoController } from "./Controlller/Transacao/deleteTransacaoController";
import { putTransacaoController } from "./Controlller/Transacao/putTransacaoController";
import { AuthController } from './Controlller/User/AuthController'

const rota = Router()

//USER
rota.get('/user', new getUserController().handle)
rota.post('/user', new postUserController().handle)
rota.post('/login', new AuthController().handle)

//TRANSAÇÕES
rota.get('/transacao', new getTransacaoController().handle)
rota.post('/transacao', new postTransacaoController().handle)
rota.put('/transacao', new putTransacaoController().handle)
rota.delete('/transacao', new deleteTransacaoController().handle)


export {rota}