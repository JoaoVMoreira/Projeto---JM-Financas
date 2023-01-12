import {Request, Response} from 'express'
import { AuthService } from '../../Service/User/AuthService'

class AuthController{
    async handle(req: Request, res:Response){
        const {email, senha} = req.body
        const authService = new AuthService()

        const auth = await authService.execute({
            email, 
            senha
        })

        return res.json(auth)
    }
}

export {AuthController}