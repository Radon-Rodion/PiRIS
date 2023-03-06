import React from "react";

const AccContext = React.createContext({
    accNumber: '',
    setAccNumber: (val) => {}
});

export default AccContext;