import styles from './footer.module.scss'
import { FaGithubSquare, FaLinkedin } from "react-icons/fa";
import Router from "next/router";



export default  function Footer(){

    return(
        <footer className={styles.conteiner}>
            <p>
                Desenvolvido por João Vittor Moreira
            </p>
            <div className={styles.icons}>
                <a href='https://github.com/JoaoVMoreira' target='blank'><button><FaGithubSquare /></button></a>
                <a href='https://www.linkedin.com/in/jvittormoreira/' target='blank'><button><FaLinkedin /></button></a>
            </div>
        </footer>
    )
}