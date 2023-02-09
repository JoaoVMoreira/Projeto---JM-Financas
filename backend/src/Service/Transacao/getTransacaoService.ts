import prismaClient from "../../prisma/config"
//FUNÇÃO PARA LISTAGEM DE TRANSAÇÕES
class getTransacaoService{
    async execute(){
        const transacao = await prismaClient.transacao.findMany({})
        return{transacao}
    }
}

export { getTransacaoService }