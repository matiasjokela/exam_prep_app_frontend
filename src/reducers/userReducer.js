import userService from "../services/user";

const setUser = (user) => {
  return {
    type: "SET_USER",
    data: { user },
  };
};

const checkUser = (local) => {
  return async (dispatch) => {
    const allUsers = await userService.getAll();
    if (local) {
      allUsers.map((user) => {
        if (user.id === local.id) {
          console.log("jee.jee", user);
          dispatch(setUser(user));
        }
      });
    } else {
      dispatch(setUser(null));
    }
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

export { checkUser };

export default reducer;
