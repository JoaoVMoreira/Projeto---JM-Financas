import prismaClient from "../../prisma/config"

interface ipostTransacaoService{
    titulo: string,
    tipo: string,
    categoria: string,
    descricao: string,
    valor: number
}

class postTransacaoService{
    async execute({categoria, descricao, tipo, titulo, valor }: ipostTransacaoService){
        const transacao = await prismaClient.transacao.create({ //CADASTRO DE TRANSAÇÕES
            data: {
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

export { postTransacaoService }