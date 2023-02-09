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

    async function Signin(){ //Função de login

        if(email == '' || senha == ''){ //Verificando se todos os dados foram preenchidos
            alert('Favor preencher todos os campos!')
        }

        try{
            const response = await base.post('/login', { //Efetuando o login 
                email, 
                senha
            })
            const { id, nome, sobrenome, token } = response.data
            
            setCookie(undefined, '@authToken', token, { //Setando token e salvando em cookie
                maxAge: 60*60*24*30,
                path: "/"
            })

            setUser({ id, nome, sobrenome, token }) //setando user com os dados do usuario 
            const passandoUserData = await localStorage.setItem('DataUser', JSON.stringify(nome)) //Salvando dados no localSotage para uso no dashboard
            base.defaults.headers['Authorization'] = `Bearer ${token}`
            Router.push('/dashboard') //Direcionando para o Dashboard
        }catch(error){
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

export const getServerSideProps = canSSRGuest(async(ctx) => { //Setando com uma pagina que somente usuarios nao logados podem acessa
    return{
        props:{}
    }
})