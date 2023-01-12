import { compare } from "bcryptjs"
import prismaClient from "../../prisma/config"
import {sign} from 'jsonwebtoken'

interface iAuthService{
    email: string
    senha: string
}

class AuthService{
    async execute({ email, senha }: iAuthService){
        const user = await prismaClient.user.findFirst({
            where:{
                email: email
            }
        })

        if(!user){
            throw new Error('Usuário ou senha inválidos!')
        }

        const passwordMatch = await compare(senha, user.senha)

        if(!passwordMatch){
            throw new Error("Usuário ou senha inválidos!")
        }

        const token = sign(
            {
                nome:user.nome,
                sobrenome: user.sobrenome,
                email: user.email
            }, process.env.JWT_SECRET,{
                subject: user.id,
                expiresIn: '30d'
            }
        )

        return {
            id: user.id,
            email: user.email,
            nome: user.nome,
            sobrenome: user.sobrenome,
            token 
        }
    }
}

export { AuthService }