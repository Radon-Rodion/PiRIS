import React from "react";

const OperationContext = React.createContext({
    operationReport: {},
    setOperationReport: (val) => {}
});

export default OperationContext;