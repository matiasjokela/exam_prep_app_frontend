const setQuestions = (questions) => {
  return {
    type: "SET_QUESTIONS",
    data: { questions },
  };
};

const setLength = (length) => {
  return {
    type: "SET_LENGTH",
    data: { length },
  };
};

const setIndex = (index) => {
  return {
    type: "SET_INDEX",
    data: { index },
  };
};

const updateQuestions = (questions) => {
  console.log("questions", questions);
  return async (dispatch) => {
    dispatch(setQuestions(questions));
  };
};

const updateLength = (length) => {
  return async (dispatch) => {
    dispatch(setLength(length));
  };
};

const updateIndex = (index) => {
  return async (dispatch) => {
    dispatch(setIndex(index));
  };
};

const initialState = {
  questions: [],
  length: 0,
  index: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_QUESTIONS":
      return {
        ...state,
        questions: action.data.questions,
      };
    case "SET_LENGTH":
      return {
        ...state,
        length: action.data.length,
      };
    case "SET_INDEX":
      return {
        ...state,
        index: action.data.index,
      };
    default:
      return state;
  }
};

export { updateQuestions, updateLength, updateIndex };

export default reducer;
