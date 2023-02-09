import Head from 'next/head'
import { canSSRAuth } from '../../utils/canSSRAuth'
import Footer from '../../components/foooter'
import LogoImg from '../../../public/logo-branco.png'
import dashImg from '../../../public/img-dashboard.svg'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import AddModal from '../../components/modal/addModal'
import base from '../../axios/config'
import _ from 'lodash'
import Chart from 'react-google-charts'
import { BsFillCircleFill, BsInfoSquareFill } from "react-icons/bs";
import { TiEdit } from "react-icons/ti";
import EditModal from '../../components/editModal'
import InfoModal from '../../components/infoModal'
import styles from './dashboard.module.scss';
import { BiLogOut, BiAddToQueue } from "react-icons/bi";
import { destroyCookie } from 'nookies'
import Router from 'next/router'


export default function Dashboard(){

    const[showAddModal, setShowAddModal] = useState(false)
    const[showEditModal, setShowEditModal] = useState(false)
    const[showInfoModal, setShowInfoModal] = useState(false)

    const[details, setDetails] = useState([])
    const[transacoes, setTransacoes] = useState([])
    const[gastos, setGastos] = useState([])
    const[geral, setGeral] = useState([])
    const[investimento, setInvestimento] = useState([])


    const[totGasto, setTotGasto] = useState([])
    const[totInv, setTotInv] = useState([])
    const[disponivel, setDisponivel] = useState([])
    const[nome, setNome] = useState('')

    async function openAddModal(value) { //Criando modal de inclusão
        setShowAddModal(!showAddModal)

        getTransacoes()
        setDetails(value)
    }

    async function handleEdit(value) {//Criando modal de Edição
        setShowEditModal(!showEditModal)

        getTransacoes()
        setDetails(value)
    }

    async function handleInfos(value){ //Criando modal de infos
        setShowInfoModal(!showInfoModal)

        getTransacoes()
        setDetails(value)
    }

    async function getTransacoes(){
        const data = await base.get('/transacao')
        setTransacoes(data.data.transacao)

        //Separando os dados em tipos
        const values = _.groupBy(transacoes, (value) => value.tipo)


        //GASTOS
        const gast = _.groupBy(values.Gasto, (value) => value.categoria)
        const organizaGastos = _.map(gast, (value, key) => [
            key, 
            _.sumBy(gast[key], (v) => v.valor)
        ])
        const graficoGastos = [["Categoria", "Valor"], ...organizaGastos]
        setGastos(graficoGastos)
        setTotGasto(values.Gasto)


        //INVESTIMENTOS
        const invest = _.groupBy(values.Investimento, (value)=> value.categoria)
        const organizaInvestimentos = _.map(invest, (value, key) => [
            key, 
            _.sumBy(invest[key], (v)=> v.valor)
        ])
        const graficoInvest = [["Categoria", "Valor"], ...organizaInvestimentos]
        setInvestimento(graficoInvest)

        //GERAL
        const organizaGeral = _.map(values, (value, key) => [
            key,
            _.sumBy(values[key], (v) => v.valor)
        ])
        const graficoGeral = [["Categoria", "Valor"], ...organizaGeral]
        setGeral(graficoGeral)
        
        
        
        //Setando soma dos valores
        const gastosTot = graficoGeral[1]
        const invTot = graficoGeral[3]
        const disp = graficoGeral[2]
        setTotGasto(gastosTot[1].toFixed(2))
        setTotInv(invTot[1].toFixed(2))
        const totDisponivel = disp[1] - (gastosTot[1] + invTot[1])
        setDisponivel(totDisponivel.toFixed(2))

        const name = localStorage.getItem('DataUser')
        setNome(name)
    }

    async function logOut(){ //Função de logOut, destruindo o cookie que contem o token
        destroyCookie(undefined, '@authToken')
        Router.push('/')
    }
    
    
    
    useEffect(() => {
        getTransacoes() //Capturando os daddos
    }, [])
    return(
        <>
        <div className={styles.conteiner}>
        <Head>
            <title>Dashboard</title>
        </Head>
        <header>
            <Image src={LogoImg} alt='Logo'/>
            <button onClick={logOut} className={styles.logOut}><BiLogOut /></button>
                    <button onClick={() => { openAddModal() }}>Adicionar movimentação <BiAddToQueue fontSize={'20px'} color='#6824E1' /></button>
        </header>
        <div className={styles.content}>
            <h1>Olá, {nome}!</h1>

            {!transacoes ? ( //Caso nao tenham transações cadastradas é renderizado o H1 abaixo
                    <div>
                        <h1>Não constam transações</h1>
                    </div>
            ): (
                <>
                                <div className={styles.content2}>
                                    <div className={styles.saldos}>
                                        <div className={styles.saldoUni}>
                                            <h3>Saldo disponivel</h3>
                                            <span><span id={styles.ganho}>R$</span>{disponivel}</span>
                                        </div>
                                        <div className={styles.saldoUni}>
                                            <h3>Total gasto</h3>
                                            <span><span id={styles.gasto}>R$</span>{totGasto}</span>
                                        </div>
                                        <div className={styles.saldoUni}>
                                            <h3>Total Investido</h3>
                                            <span><span id={styles.investimento}>R$</span>{totInv}</span>
                                        </div>
                                    </div>
                                    <div className={styles.distribGastos}>
                                        <h3>Distribuição de gastos</h3>
                                        <Chart id={styles.chart} chartType='PieChart' options={options} data={gastos} />
                                    </div>
                                </div>

                                <div className={styles.content3}>
                                    <div className={styles.observacao}>
                                        <h2>Observações</h2>
                                        <p>Lorem ipsum dolor sit amet. Qui nostrum autem et vitae dicta sed quia facere a reiciendis earum sed quos eveniet. Id nemo porro sed mollitia autem aut explicabo consequatur aut minima aperiam! Eos quam dignissimos id fuga cupiditate qui iusto galisum. Lorem ipsum dolor sit amet. Qui nostrum autem et vitae dicta sed quia facere a reiciendis earum sed quos eveniet. Id nemo porro sed mollitia autem aut explicabo consequatur aut minima aperiam! Eos quam dignissimos id fuga cupiditate qui iusto galisum.</p>
                                    </div>
                                    <div className={styles.investimentos}>
                                        <h2>Distribuição de investimentos</h2>
                                        <Chart chartType='PieChart' data={investimento} width={"100%"} />
                                    </div>
                                </div>

                                <div className={styles.content4}>
                                    <div className={styles.Saldogeral}>
                                        <h2>Distribuição geral</h2>
                                        <Chart chartType='PieChart' data={geral} width={"100%"} />
                                    </div>

                                    <Image src={dashImg} alt='Imagem do dashboard' />
                                </div>

                                <button id={styles.addBtn} onClick={() => { openAddModal() }}>Adicionar movimentação <BiAddToQueue /></button>

                                <div className={styles.content5}>
                                    <h2>Transações</h2>
                                    <table>
                                        <tbody>
                                            {transacoes.map((value) => { //Listado transações 
                                                var teste = 'Yellow'
                                                if (value.tipo === "Gasto"){
                                                    teste = "red"
                                                } else if (value.tipo === "Ganho"){
                                                    teste = "green"
                                                }
                                                return (
                                                    <tr key={value.id}>
                                                        <td><BsFillCircleFill color={teste}/></td>
                                                        <td>{value.titulo}</td>
                                                        <td>R${value.valor.toFixed(2)}</td>
                                                        <td><button onClick={() => handleEdit(value)}><TiEdit /></button></td>
                                                        <td><button onClick={() => handleInfos(value)}><BsInfoSquareFill /></button></td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                </>
            )}
            

        </div>
        {showAddModal && (//Apresentando modal de inclusões
            <AddModal
            conteudo={details}
            close={openAddModal}
            isOpen={showAddModal}/>
        )}

        {showEditModal && ( //Apresentando modal de Edições
            <EditModal
            conteudo={details}
            close={handleEdit}
            isOpen={showEditModal} />
        )}

        {showInfoModal && ( //Apresentando modal de informações
            <InfoModal
                close={handleInfos}
                conteudo={details}
                isOpen={showInfoModal}
            />
        )}
        </div>
        <Footer/>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async(ctx)=>{ //Setando como uma pagina que somente usuarios logados podem acessar
    return{
        props:{}
    }
})