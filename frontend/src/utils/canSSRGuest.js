import { parseCookies } from "nookies"

export function canSSRGuest(fn){
    return async(ctx) => {

        const cookies = parseCookies(ctx)

        if (cookies['@authToken']){
            return{
                redirect:{
                    destination: '/dashboard',
                    permanent: false
                }
            }
        }
        return await fn(ctx)
    }
}