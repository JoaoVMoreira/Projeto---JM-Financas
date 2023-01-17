import Modal from 'react-modal'
import { useState } from 'react'
import base from '../../axios/config'
import styles from '../modal/addModal.module.scss'
import { IoMdArrowRoundBack } from "react-icons/io";

export default function EditModal({conteudo, isOpen, close}){

    const [titulo, setTitulo] = useState('')
    const [tipo, setTipo] = useState('')
    const [categoria, setCategoria] = useState('')
    const [valor, setValor] = useState('')
    const [descricao, setDescricao] = useState('')
    const [transacao, setTransacoes] = useState([])
    

    async function handleEdit(){
        try{
            const edit = await base.put('/transacao', {
                where:{
                    id: conteudo.id
                },
                titulo: titulo,
                tipo: tipo,
                categoria: categoria, 
                valor: parseFloat(valor),
                descricao: descricao,
                id: conteudo.id
            }) 

            alert('Transação atualizada com sucesso')
            close()
        }catch(error){
            alert('Erro ao atualizar. Tente novamente!')
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
                    <h1>Editar transação</h1>
                    <button onClick={close}><IoMdArrowRoundBack /></button>
                </div>  

                <div className={styles.form}>
                    <input placeholder='Titulo' value={titulo} onChange={(e)=> setTitulo(e.target.value)}/>
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
                    <button onClick={handleEdit}>Alterar</button>
                </div>
            </div>
        </Modal>
    )
}