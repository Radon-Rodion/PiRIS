import React from "react";

const PageContext = React.createContext({
    page: 0,
    setPage: (val) => {}
});

export const ANY_MORE_OPERATIONS = -2;
export const TAKE_CARD = -1;
export const ENTER_ACC_NUMBER = 0;
export const ENTER_ACC_PIN = 1;
export const CHOOSE_OPERATION = 2;
export const OPERATION_COMPLETE = 3;

export const ENTER_CARD_NUMBER_FOR_TRANSACTION = 10;
export const ENTER_SUM_FOR_TRANSACTION = 11;
export const ENTER_SUM_TO_TAKE = 20;
export const ACC_STATE = 30;

export default PageContext;