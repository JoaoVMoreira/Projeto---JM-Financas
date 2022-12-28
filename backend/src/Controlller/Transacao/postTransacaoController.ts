import { Request, Response } from "express"
import { postTransacaoService } from '../../Service/Transacao/postTransacaoService'

class postTransacaoController{
    async handle(req: Request, res: Response){
        const {titulo, tipo, categoria, descricao, valor} = req.body
        const PostTransacaoService = new postTransacaoService()
        const transacao = await PostTransacaoService.execute({ titulo, tipo, categoria, descricao, valor })
        return res.json(transacao)
    }
}

export { postTransacaoController }