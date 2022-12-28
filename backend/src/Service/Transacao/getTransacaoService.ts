import prismaClient from "../../prisma/config"

class getTransacaoService{
    async execute(){
        const transacao = await prismaClient.transacao.findMany({})
        return{transacao}
    }
}

export { getTransacaoService }