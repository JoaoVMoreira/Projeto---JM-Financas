import { destroyCookie, parseCookies } from "nookies";
//Usuários que não encontram-se logados

//Componente que define as paginas que usuários não logados não podem acessar 
export function canSSRAuth(fn){
    return async(ctx) => {
        const cookies = parseCookies(ctx)

        const token = cookies['@authToken'] //Verificando se possui token cadastrado
        
        if(!token){ //Caso não tenha token direciona para a pagina de login 
            return{
                redirect: {
                    destination: '/login',
                    permanent: false
                }
            }
        }
        try{
            return await fn(ctx)
        }catch(error){
            destroyCookie(ctx, '@authToken')
            return {//Caso não tenha token direciona para a pagina de login 
                destination: '/login',
                permanent: false
            }
        }
    }
}