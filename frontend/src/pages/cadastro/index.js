/* eslint-disable @next/next/no-html-link-for-pages */
import Footer from '../../components/foooter'
import Head from 'next/head'
import styles from './cadastro.module.scss'
import Image from 'next/image'
import LogoIMG from '../../../public/logo-branco.png'
import Avatar from '../../../public/avatar.png'
import Link from 'next/link'
import { useState } from 'react'
import base from '../../axios/config'
import Router from 'next/router'
import { canSSRGuest } from '../../utils/canSSRGuest'

export default function Cadastro() {
    const [nome, setNome] = useState('')
    const [sobrenome, setSobrenome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    async function Signup(){
        if(nome === '' || sobrenome === '' || email === '' || senha === ''){
            alert('Favor preencher todos os campos!')
        }
        const response = base.post('/user', {
            nome, sobrenome, email, senha
        })
        Router.push("/login")
    }

    return (
        <>
            <Head>
                <title>Cadastro</title>
            </Head>
            <div className={styles.conteiner}>
                <header>
                    <a href='/'><Image src={LogoIMG} alt='Logo do site' /></a>
                </header>
                <div className={styles.formArea}>
                    <Image src={Avatar} alt='avatar' />
                    <input placeholder='E-mail' value={email} onChange={(e)=> setEmail(e.target.value)}/>
                    <div className={styles.nomeSobrenome}>
                        <input className={styles.nome} placeholder='Nome' value={nome} onChange={(e) => setNome(e.target.value)} />
                        <input placeholder='Sobrenome' value={sobrenome} onChange={(e) => setSobrenome(e.target.value)} />
                    </div>
                    <input placeholder='Senha' type='password' value={senha} onChange={(e) => setSenha(e.target.value)} />
                </div>
                <button onClick={Signup}>Cadastrar-se</button>
                <Link href='/login'>Já possui cadastro?</Link>
            </div>
            <Footer />
        </>
    )
}

export const getServerSideProps = canSSRGuest(async(ctx)=>{
    return{
        props: {}
    }
})