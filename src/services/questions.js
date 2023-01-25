import axios from "axios";
const baseUrl = "/api/questions";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  const questions = response.data.map((q) => q);
  return questions;
};

const addQuestion = async (question) => {
  const response = await axios.get(baseUrl);
  const questions = response.data.map((q) => q);
  return questions;
};

export default { getAll, addQuestion };
