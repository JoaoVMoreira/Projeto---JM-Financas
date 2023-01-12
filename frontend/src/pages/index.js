/* eslint-disable react/no-unescaped-entities */
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import LogoImg from '../../public/logo-branco.png'
import styles from '../../styles/home.module.scss'
import { RiBankFill } from "react-icons/ri";
import { FaAngleRight, FaAngleLeft, FaHandHoldingUsd, FaPiggyBank, FaGamepad } from "react-icons/fa";
import DashImg from '../../public/dashboard.png'
import estrela from '../../public/estrelas.png'
import Footer from '../components/foooter'
import { useEffect, useRef, useState } from 'react'


export default function Home() {

  const [noticias, setNoticias] = useState([])
  const carrossel = useRef(null)

  async function LoadNoticias(){
    let url = `https://api.nytimes.com/svc/topstories/v2/world.json?api-key=AgPNGMICW4hI8qpcmBDy8jzDjqTdOhzH`
    fetch(url)
    .then((result)=> result.json())
    .then((json)=> {
      setNoticias(json.results)
      console.log(noticias)
    })
  }

  useEffect(()=>{
    LoadNoticias()
  
  }, [])

  const handleLeftScroll = (e)=> {
    e.preventDefault()
    carrossel.current.scrollLeft -= carrossel.current.offsetWidth
  }

  const handleRightScroll = (e) => {
    e.preventDefault()
    carrossel.current.scrollLeft += carrossel.current.offsetWidth
  }

  return (
    <>
      <Head>
        <title>JM Finanças</title>
      </Head>
      <div className={styles.header}>
        <header>
            <Image src={LogoImg} alt='Imagem logo'/>
            <div className={styles.menuPrincipal}>
              <Link href={'/login'}>Login</Link>
            <Link href='/cadastro'><button href='/cadastro'>Comece já!</button></Link>
            </div>
        </header>
      </div>
      <main>
        <div className={styles.ImgPrincipal}>
          <h1>Uma forma <span>simples</span> de adiministrar suas finanças!</h1>
        </div>
      </main>

      <div className={styles.content}>
        <div className={styles.carrosselItens}>
          <div className={styles.item}>
            <span><FaGamepad color='#6824E1' /></span>
            <h3>Controle de despezas</h3>
          </div>
          <div className={styles.item}>
            <span><RiBankFill color='#6824E1'/></span>
            <h3>Conciliação bancária</h3>
          </div>
          <div className={styles.item}>
            <span><FaHandHoldingUsd color='#6824E1' /></span>
            <h3>Planejador financeiro</h3>
          </div>
          <div className={styles.item}>
            <span><FaPiggyBank color='#6824E1' /></span>
            <h3>Investimentos</h3>
          </div>
        </div>
        <div className={styles.controleTot}>
          <div className={styles.text}>
            <h2>Controle total das finanças na palma da sua mão</h2>
            <p>Lorem ipsum dolor sit amet. Qui nostrum autem et vitae dicta sed quia facere a reiciendis earum sed quos eveniet. Id nemo porro sed mollitia autem aut explicabo consequatur aut minima aperiam! Eos quam dignissimos id fuga cupiditate qui iusto galisum.</p>
          </div>
          <div className={styles.dashImg}>  
            <Image src={DashImg}/>
          </div>
        </div>
        <div className={styles.ultimasNoticias}>
          <h3>Ultimas noticias</h3>
          <h2>Aprenda sobre finanças</h2>
          <div className={styles.noticeCarrocel} ref={carrossel}>
          {noticias.map((item)=>{
            
            return(
              <article key={item.abstract}>
                <img width={20} height={20} src={`${item.multimedia}`}/>
                <div className={styles.conteudo}>
                  <h4>{item.des_facet[0]}</h4>
                  <span>{item.abstract}</span>
                </div>
                <a href={item.url} target='blank'><button >Leia mais</button></a>
                </article>
            )
          })}
          </div>
          <div className={styles.ScrollBtn}>
            <button onClick={handleLeftScroll}><FaAngleLeft /></button>
            <button onClick={handleRightScroll}><FaAngleRight/></button>
          </div>
        </div>
        <div className={styles.quemUsas}>
          <h3>Quem usa</h3>
          <h2>APROVA!</h2>
          <div className={styles.opn}>
            <div className={styles.opniao}>
              <h4>"Lorem ipsum dolor!"</h4>
              <Image src={estrela}/>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse facilisis neque sit.</p>
            </div>

            <div className={styles.opniao}>
              <h4>"Lorem ipsum dolor!"</h4>
              <Image src={estrela}/>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse facilisis neque sit.</p>
            </div>

            <div className={styles.opniao}>
              <h4>"Lorem ipsum dolor!"</h4>
              <Image src={estrela} />
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse facilisis neque sit.</p>
            </div>

            <div className={styles.opniao}>
              <h4>"Lorem ipsum dolor!"</h4>
              <Image src={estrela} />
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse facilisis neque sit.</p>
            </div>
          </div>
          

        </div>
      </div>
      <Footer/>
      
    </>
  )
}
