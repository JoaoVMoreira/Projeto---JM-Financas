import axios from 'axios' 

const base = axios.create({
    baseURL: 'http://localhost:3001/',
    Headers: {
        "Content-Type": "application/json"
    }
})

export default base