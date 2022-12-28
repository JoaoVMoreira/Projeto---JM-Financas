import { Request, Response } from "express"
import { postUserService } from "../../Service/User/postUserService"

class postUserController{
    async handle(req: Request, res: Response){
        const {nome, sobrenome, email, senha} = req.body
        const PostUserService = new postUserService()
        const user = await PostUserService.execute({ nome, sobrenome, email, senha })
        return res.json(user)
    }
}

export { postUserController }