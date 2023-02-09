import { parseCookies } from "nookies"
//Usuários que encontram-se logados

//Componente que define as paginas que usuários logados não podem acessar 
export function canSSRGuest(fn){
    return async(ctx) => {

        const cookies = parseCookies(ctx)

        if (cookies['@authToken']) { //Caso tenham cookies no @authToken é acionada a função abaixo
            return{
                redirect:{
                    destination: '/dashboard', //Direcionando para a pagina dashboard
                    permanent: false
                }
            }
        }
        return await fn(ctx)
    }
}