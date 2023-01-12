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
import { BsFillCircleFill } from "react-icons/bs";
import { AiFillEdit, AiFillInfoCircle } from "react-icons/ai";



export default function Dashboard(){

    const[showAddModal, setShowAddModal] = useState(false)
    const[details, setDetails] = useState([])
    const[transacoes, setTransacoes] = useState([])
    const[gastos, setGastos] = useState([])
    const[geral, setGeral] = useState([])
    const[investimento, setInvestimento] = useState([])


    const[totGasto, setTotGasto] = useState([])
    const[totInv, setTotInv] = useState([])
    const[disponivel, setDisponivel] = useState([])

    async function openAddModal(value){
        setShowAddModal(!showAddModal)
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
        const invTot = graficoGeral[2]
        const disp = graficoGeral[3]
        setTotGasto(gastosTot[1])
        setTotInv(invTot[1])
        const totDisponivel = disp[1] - (totGasto + totInv)
        setDisponivel(totDisponivel)
    }
    
    
    
    
    useEffect(() => {
        getTransacoes() 
        console.log(disponivel)
    }, [])
    return(
        <>
        <Head>
            <title>Dashboard</title>
        </Head>
        <header>
            <Image src={LogoImg} alt='Logo'/>
            <button onClick={()=> {openAddModal()}}>Adicionar movimentação</button>
        </header>
        <div>
            <h1>Olá, nome!</h1>
            <h3>Saldo disponivel</h3>
            <span>{disponivel}</span>
            <h3>Total gasto</h3>
            <span>{totGasto}</span>
            <h3>Total Investido</h3>
            <span>{totInv}</span>
            <h2>Distribuição de gastos</h2>
            <Chart chartType='PieChart' data={gastos} width={"100%"}/>

            <h2>Observações</h2>
            <p>Lorem ipsum dolor sit amet. Qui nostrum autem et vitae dicta sed quia facere a reiciendis earum sed quos eveniet. Id nemo porro sed mollitia autem aut explicabo consequatur aut minima aperiam! Eos quam dignissimos id fuga cupiditate qui iusto galisum.</p>

            <h2>Distribuição de investimentos</h2>
            <Chart chartType='PieChart' data={investimento} width={"100%"} />

            <h2>Distribuição geral</h2>
            <Chart chartType='PieChart' data={geral} width={"100%"} />

            <Image src={dashImg} alt='Imagem do dashboard'/>


            <button onClick={() => { openAddModal() }}>Adicionar movimentação</button>


            <h2>Transações</h2>
            <table>
                <tbody>
                    {transacoes.map((value)=> {
                        return(
                            <tr key={value.id}>
                                <td><BsFillCircleFill style={{fontcolor: value.categoria == 'Investimento' ? '#fad02c' : "green"}}/></td>
                                <td>{value.titulo}</td>
                                <td>R${value.valor}</td>
                                <td><button><AiFillEdit/></button></td>
                                <td><button><AiFillInfoCircle/></button></td>
                            </tr>
                        )
                    })}
                        </tbody>
            </table>

        </div>
        {showAddModal && (
            <AddModal
            conteudo={details}
            close={openAddModal}
            isOpen={showAddModal}/>
        )}
        <Footer/>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async(ctx)=>{
    return{
        props:{}
    }
})