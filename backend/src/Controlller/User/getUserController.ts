import { Request, Response } from "express"
import { getUserService } from "../../Service/User/getUserService"

class getUserController{
    async handle(req: Request, res: Response){
        const GetUserService = new getUserService()
        const user = await GetUserService.execute()
        return res.json(user)
    }
}

export {getUserController}