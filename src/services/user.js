import axios from "axios";
const baseUrl = "/api/users";

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

const deleteUser = async (id) => {
  const url = baseUrl.concat("/", id);
  const response = await axios.delete(url);
  return response.data;
};

const checkToken = async (token) => {
  const url = baseUrl.concat("/token");
  let response = null;
  try {
    response = await axios.post(url, { token });
  } catch (e) {
    console.log(e);
  }
  return response;
};

export default { addUser, getAll, getById, update, deleteUser, checkToken };
