import axios from "axios";
const baseUrl = "/api/questions";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  const questions = response.data.map((q) => q);
  return questions;
};

const addQuestion = async (question) => {
  const response = await axios.post(baseUrl, question);
  console.log("response here:", response);
  const addedQuestion = response.data;
  return addedQuestion;
};

export default { getAll, addQuestion };
