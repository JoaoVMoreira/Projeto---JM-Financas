import { Request, Response } from "express"
import { putTransacaoService } from "../../Service/Transacao/putTransacaoService"

class putTransacaoController{
    async handle(req: Request, res: Response){
        const { id, titulo, tipo, categoria, descricao, valor } = req.body
        const PutTransacaoService = new putTransacaoService()
        const transacao = await PutTransacaoService.execute({ id, titulo, tipo, categoria, descricao, valor})
        return res.json(transacao)
    }
}

export { putTransacaoController }