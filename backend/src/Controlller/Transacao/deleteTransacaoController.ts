import { Request, Response } from "express"
import { deleteTransacaoService } from "../../Service/Transacao/deleteTransacaoService"

class deleteTransacaoController{
    async handle(req: Request, res: Response){
        const id = req.query.id as string //Solicitando o ID pelo query
        const DeleteTransacaoService = new deleteTransacaoService()
        const transacao = await DeleteTransacaoService.execute({ id })
        return res.json(transacao)
    }
}

export { deleteTransacaoController }