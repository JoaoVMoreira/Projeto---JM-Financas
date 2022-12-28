import prismaClient from "../../prisma/config"

interface ideleteTransacaoService{
    id: string
}

class deleteTransacaoService{
    async execute({ id }: ideleteTransacaoService){
        const transacao = await prismaClient.transacao.delete({
            where:{
                id: id
            }
        })
        return{transacao}
    }
}

export { deleteTransacaoService }