import axios from 'axios'
const baseURL = 'http://localhost:3001/persons'

async function getAll() {
    const res = await axios.get(baseURL)
    return res.data //which is also a promise!!!
}

async function create(newPerson) {
    const res = await axios.post(baseURL, newPerson)
    return res.data
}

async function update(id, newPerson) {
    const res = await axios.put(`${baseURL}/${id}`, newPerson)
    return res.data
}

async function remove(id) {
    console.log(`${baseURL}/${id}`)
    const res = await axios.delete(`${baseURL}/${id}`)
    return res.data
}

export default {getAll, create, update, remove}

