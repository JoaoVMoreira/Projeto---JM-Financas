/* eslint-disable @next/next/no-html-link-for-pages */
import Footer from '../../components/foooter'
import Head from 'next/head'
import styles from './login.module.scss'
import Image from 'next/image'
import LogoIMG from '../../../public/logo-branco.png'
import Avatar from '../../../public/avatar.png'
import Link from 'next/link'
import { useState } from 'react'
import base from '../../axios/config'
import {setCookie, parseCookies} from 'nookies'
import Router from 'next/router'
import { canSSRGuest } from '../../utils/canSSRGuest'

export default function Login(){

    const [email, setEmail]  = useState('')
    const [senha, setSenha] = useState('')
    const [user, setUser] = useState([])

    async function Signin(){

        if(email == '' || senha == ''){
            alert('Favor preencher todos os campos!')
        }

        try{
            const response = await base.post('/login', {
                email, 
                senha
            })
            const { id, nome, sobrenome, token } = response.data
            
            setCookie(undefined, '@authToken', token, {
                maxAge: 60*60*24*30,
                path: "/"
            })

            setUser({ id, nome, sobrenome, token })
            const teste = await localStorage.setItem('DataUser', JSON.stringify(nome))
            base.defaults.headers['Authorization'] = `Bearer ${token}`
            console.log(nome)
            Router.push('/dashboard')
        }catch(error){
            console.log(error)
            alert('Usuário ou senha inválidos')
        }
    }

    return(
        <>
            <Head>
                <title>Login</title>
            </Head>
            <div className={styles.conteiner}>
                <header>
                    <a href='/'><Image src={LogoIMG} alt='Logo do site' /></a>
                </header>
                <div className={styles.formArea}>
                    <Image src={Avatar} alt='avatar'/>
                    <input placeholder='E-mail' value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <input placeholder='Senha' type='password' value={senha} onChange={(e) => setSenha(e.target.value)}/>
                    <button onClick={Signin}>Entrar</button>
                </div>
                    <Link href='/cadastro'>Cadastrar-se</Link>
            </div>
            <Footer/>
        </>
    )
}

export const getServerSideProps = canSSRGuest(async(ctx) => {
    return{
        props:{}
    }
})