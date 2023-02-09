import prismaClient from "../../prisma/config"

interface iputTransacaoService{
    id: string,
    titulo: string, 
    tipo: string, 
    categoria: string, 
    descricao: string, 
    valor: number
}
//Atualização das transações já cadastradas
class putTransacaoService{
    async execute({categoria, descricao, id, tipo, titulo, valor }: iputTransacaoService){
        const transacao = await prismaClient.transacao.update({
            where:{
                id: id
            },
            data:{
                id: id,
                titulo: titulo,
                tipo: tipo,
                categoria: categoria,
                descricao: descricao,
                valor: valor
            }
        })
        return{transacao}
    }
}

export { putTransacaoService }