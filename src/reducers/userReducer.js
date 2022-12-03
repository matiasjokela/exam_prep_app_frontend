import userService from "../services/user";

const setUser = (user) => {
  return {
    type: "SET_USER",
    data: { user },
  };
};

const checkUser = (local) => {
  return async (dispatch) => {
    const response = await userService.checkToken(local.token);
    let user;
    if (response && response.data) {
      user = await userService.getById(response.data);
      dispatch(setUser(user));
    } else {
      dispatch(setUser(null));
    }
  };
};

const updateStats = (user) => {
  return async (dispatch) => {
    console.log("tääl", user);
    dispatch(setUser(user));
  };
};

const initialState = null;

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      state = action.data.user;
      return state;
    default:
      return state;
  }
};

export { checkUser, updateStats };

export default reducer;
