import { SET_USER, RESET } from "../Actions/UserActions";

export const setUserAction = (payload) => ({ type: SET_USER, payload });
export const resetUserAction = () => ({ type: RESET });