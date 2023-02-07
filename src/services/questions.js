import axios from "axios";
const baseUrl = "/api/questions";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  const questions = response.data.map((q) => q);
  return questions;
};

const addQuestion = async (question) => {
  const response = await axios.post(baseUrl, question);
  const addedQuestion = response.data;
  return addedQuestion;
};

const deleteQuestion = async (id) => {
  const url = baseUrl.concat("/", id);
  const response = await axios.delete(url);
  return response.data;
};

export default { getAll, addQuestion, deleteQuestion };
