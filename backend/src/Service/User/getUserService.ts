import prismaClient from '../../prisma/config'

class getUserService{
    async execute(){
        const user = await prismaClient.user.findMany({}) //Localizando o usuario
        return {user}
    }
}

export {getUserService}