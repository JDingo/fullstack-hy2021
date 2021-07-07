import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/persons'

const getAll = () => {
    return axios.get(baseUrl)
}

const create = (newObject) => {
    return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject)
}

const deleteEntry = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

const change = (person, newNumber) => {
    return axios.put(`${baseUrl}/${person.id}`, {name: person.name, number: newNumber, id: person.id})
}

export default { getAll, create, update, deleteEntry, change }