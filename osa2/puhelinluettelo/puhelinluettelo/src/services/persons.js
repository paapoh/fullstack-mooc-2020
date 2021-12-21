import axios from 'axios'
const baseurl = 'http://localhost:3001/persons'

const getAll = () => (
    axios.get(baseurl)
)

const create = newObject => (
    axios.post(baseurl, newObject)
)

const update = (id, newObject) => (
    axios.put(`${baseurl}/${id}`, newObject)
)

const del = (id) => (
    axios.delete(`${baseurl}/${id}`)
)

export default {
    getAll: getAll,
    create: create,
    update: update,
    del: del
}