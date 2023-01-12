import prismaClient from "../../prisma/config"
import { hash } from "bcryptjs"

interface ipostUserService{
    nome: string, 
    sobrenome: string,
    email: string,
    senha: string
}

class postUserService{
    async execute({email, nome, senha, sobrenome }: ipostUserService){
        if(nome == '' || email == '' || senha == '' || sobrenome == ''){
            throw new Error('Favor preencher todos os campos')
        }

        const jaExiste = await prismaClient.user.findFirst({
            where:{
                email: email
            }
        })

        if(jaExiste){
            throw new Error('E-mail ja cadastrado!')
        }

        const passwordHash = await hash(senha, 8)

        const user = await prismaClient.user.create({
            data:{
                nome: nome,
                sobrenome: sobrenome,
                email: email,
                senha: passwordHash
            }, select:{
                id: true,
                nome:true,
                sobrenome: true,
                email:true
            }
        })
        return {user}
    }
}

export { postUserService }