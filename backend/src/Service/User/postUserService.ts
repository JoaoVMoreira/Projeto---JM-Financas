import prismaClient from "../../prisma/config"

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

        const user = await prismaClient.user.create({
            data:{
                nome: nome,
                sobrenome: sobrenome,
                email: email,
                senha: senha
            }
        })
        return {user}
    }
}

export { postUserService }