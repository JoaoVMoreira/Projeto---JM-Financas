import prismaClient from "../../prisma/config"
import { hash } from "bcryptjs"

interface ipostUserService{
    nome: string, 
    sobrenome: string,
    email: string,
    senha: string
}
//Cadastro de user
class postUserService{
    async execute({email, nome, senha, sobrenome }: ipostUserService){
        if(nome == '' || email == '' || senha == '' || sobrenome == ''){
            throw new Error('Favor preencher todos os campos')
        }

        const jaExiste = await prismaClient.user.findFirst({ //Verificando se tem usuario cadastrado com o e-mail informado
            where:{
                email: email
            }
        })

        if(jaExiste){ //Se já existe o e-mail, retorna o erro 
            throw new Error('E-mail ja cadastrado!')
        }

        const passwordHash = await hash(senha, 8) //Criptografando a senha

        const user = await prismaClient.user.create({ //Criando o usuário 
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