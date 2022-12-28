import { Request, Response } from "express"
import { getTransacaoService } from "../../Service/Transacao/getTransacaoService"

class getTransacaoController{
    async handle(req: Request, res: Response){
        const GetTransacaoService = new getTransacaoService()
        const transacao = await GetTransacaoService.execute()
        return res.json(transacao)
    }
}

export { getTransacaoController }