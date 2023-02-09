import { compare } from "bcryptjs"
import prismaClient from "../../prisma/config"
import {sign} from 'jsonwebtoken'

interface iAuthService{
    email: string
    senha: string
}

class AuthService{  //Sistema de autenticação
    async execute({ email, senha }: iAuthService){
        const user = await prismaClient.user.findFirst({ //Localizado o e-mail informado
            where:{
                email: email
            }
        })

        if(!user){ //Caso o usuario não seja localizado é informada mensagem de erro 
            throw new Error('Usuário ou senha inválidos!')
        }

        const passwordMatch = await compare(senha, user.senha) //Criando variavel para verificação da senha coml a função "Compare" (comparando a senha informada com a senha do usuario )

        if(!passwordMatch){ //Caso a senha não condiza é informada uma mensagem de erro
            throw new Error("Usuário ou senha inválidos!")
        }

        const token = sign( //Gerando token e passando as informações de login
            {
                nome:user.nome,
                sobrenome: user.sobrenome,
                email: user.email
            }, process.env.JWT_SECRET,{ //Senha criptografada em .env
                subject: user.id,
                expiresIn: '30d'
            }
        )

        return { //Retornando dados do user
            id: user.id,
            email: user.email,
            nome: user.nome,
            sobrenome: user.sobrenome,
            token 
        }
    }
}

export { AuthService }