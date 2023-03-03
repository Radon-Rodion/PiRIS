import { SET_USER, RESET } from "../../Actions/UserActions";
import { serialize } from "../../../Helpers/SupportFunctions";
const USER = "userInfo";

const defaultState = {
  info: JSON.parse(localStorage.getItem(USER) ?? '{"isAdmin":null}'),
};

const userReducer = (state = defaultState, action ) => {
  switch (action.type) {
    case SET_USER:
      serialize(action.payload, USER);
      return { ...state, info: action.payload };
    case RESET:
      localStorage.clear();
      return { ...state, info: { isAdmin: undefined } };
    default:
      return state;
  }
};

export default userReducer;