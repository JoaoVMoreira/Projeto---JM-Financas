import { destroyCookie, parseCookies } from "nookies";

export function canSSRAuth(fn){
    return async(ctx) => {
        const cookies = parseCookies(ctx)

        const token = cookies['@authToken']
        
        if(!token){
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
            return{
                destination: '/login',
                permanent: false
            }
        }
    }
}