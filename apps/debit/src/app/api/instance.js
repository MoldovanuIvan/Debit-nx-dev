import axios from 'axios'

export default axios.create({
    baseURL:'https://transaction-f36c9-default-rtdb.europe-west1.firebasedatabase.app/'
})