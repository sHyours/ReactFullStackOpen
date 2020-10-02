const { default: Axios } = require("axios")

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return Axios.get(baseUrl).then(response => response.data)
}
const add = persons => {
    return Axios.post(baseUrl, persons).then(response => response.data)
}
const update = (id, persons) => {
    return Axios.put(`${baseUrl}/${id}`, persons || null).then(response => response.data)
}
const deletePerson = id => {
    return Axios.delete(`${baseUrl}/${id}`).then(() => id)
}
export default { getAll, add, update, deletePerson }