import axios from "axios";
const baseUrl = "/api/users";

let token = null;
let config;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
  config = {
    headers: { Authorization: token },
  };
};

const addUser = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getById = async (id) => {
  const url = baseUrl.concat("/", id);
  const response = await axios.get(url);
  return response.data;
};

const update = async (updatedFields, id) => {
  const url = baseUrl.concat("/", id);
  const response = await axios.put(url, updatedFields);
  return response.data;
};

export default { addUser, getAll, setToken, getById, update };
