import axios from 'axios' 

const base = axios.create({ //Criando Axios
    baseURL: 'http://localhost:3001/', //Defininfo base URL
    Headers: {
        "Content-Type": "application/json"
    }
})

export default base