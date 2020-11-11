import axios from 'axios';
const baseUrl = 'http://localhost:3001/anecdotes';
const getAll = async () => {
  return (await axios.get(baseUrl)).data;
}
const create = async (data) => {
  return (await axios.post(baseUrl, data)).data;
}
const update = async (id, data) => {
  return (await axios.put(`${baseUrl}/${id}`, data)).data;
}
export default {
  getAll,
  create,
  update,
}
