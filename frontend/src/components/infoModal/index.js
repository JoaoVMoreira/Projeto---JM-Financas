import Modal from 'react-modal'
import { AiFillEdit, AiFillInfoCircle } from "react-icons/ai";
import base from '../../axios/config';

export default function InfoModal({conteudo, close, isOpen}){

    async function handleDelete(){
        try{
            const deleteTransacao = await base.delete('/transacao',{
                params:{
                    id: conteudo.id
                }
            })
            alert('Transação deletada')
            close()

        }catch(error){
            alert('Ocorreu um erro')
        }
    }

    return(
        <Modal
        isOpen={isOpen}
        onRequestClose={close}>
            <div>
                <h1><AiFillEdit />{conteudo.titulo}</h1>
                <span>{conteudo.tipo}</span>
                <span>{conteudo.categoria}</span>
                <span>{conteudo.valor}</span>
                <span>{conteudo.descricao}</span>
                <button onClick={handleDelete}>Apagar movimentação</button>
            </div>
        </Modal>
    )
}