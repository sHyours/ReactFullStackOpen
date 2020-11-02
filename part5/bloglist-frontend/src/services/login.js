import axios from 'axios';
const api = '/api/login';
const login = async (username, password) => {
  const response =  await axios.post(api, {
    username, password
  });
  return response.data;
};
export default login;

