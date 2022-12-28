import styles from './footer.module.scss'
import { FaGithubSquare, FaLinkedin } from "react-icons/fa";


export default  function Footer(){
    return(
        <footer className={styles.conteiner}>
            <p>
                Desenvolvido por João Vittor Moreira
            </p>
            <div className={styles.icons}>
                <button><FaGithubSquare/></button>
                <button><FaLinkedin/></button>
            </div>
        </footer>
    )
}