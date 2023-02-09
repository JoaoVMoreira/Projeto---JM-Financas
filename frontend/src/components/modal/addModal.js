import { useState } from 'react'
import Modal from 'react-modal'
import base from '../../axios/config'
import styles from './addModal.module.scss'
import { IoMdArrowRoundBack } from "react-icons/io";


export default function AddModal({conteudo, close, isOpen}){

    const[titulo, setTitulo] = useState('')
    const[tipo, setTipo] = useState('')
    const[categoria, setCategoria] = useState('')
    const[valor, setValor] = useState('')
    const[descricao, setDescricao] = useState('')

    async function addTransacao(){
        try{
            const transacao = await base.post('/transacao', { //Cadastrando transação
                titulo: titulo,
                tipo: tipo,
                categoria: categoria,
                descricao: descricao,
                valor: parseFloat(valor)
            })
            alert('Transação adicionada com sucesso')
            close()
        }catch(error){
            alert('Ocorreu um erro')
        }
    }

    return(
        <Modal
            isOpen={isOpen}
            onRequestClose={close}
            overlayClassName={styles.overlay}
            className={styles.modal}>
            <div className={styles.conteiner}>
                <div className={styles.header}>
                    <h1>Adicionar movimentação</h1>
                    <button onClick={close}><IoMdArrowRoundBack /></button>
                </div>
                <div className={styles.form}>
                    <input placeholder='Titulo' value={titulo} onChange={(e) => setTitulo(e.target.value)}/>
                    <div className={styles.form2}>
                        <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
                            <option disabled>Tipo de movimentação</option>
                            <option value='Ganho'>Ganho</option>
                            <option value='Investimento'>Investimento</option>
                            <option value='Gasto'>Gasto</option>
                        </select>    
                        <input placeholder='Categoria' value={categoria} onChange={(e) => setCategoria(e.target.value)} />
                    </div>
                    <input placeholder='Valor' value={valor} onChange={(e) => setValor(e.target.value)} />
                    <textarea placeholder='Descrição' value={descricao} onChange={(e) => setDescricao(e.target.value)} />
                    <button onClick={addTransacao}>Cadastrar</button>
                </div>
            </div>
        </Modal>
    )
}