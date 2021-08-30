import React from "react";
import Td from "./td";

const Tr = ({rowData, rowIndex, dispatch}) => {
    return(
        <tr>
            {Array(rowData.length).fill().map((td, i) => (
                <Td rowIndex={rowIndex} cellIndex={i} cellData={rowData[i]} dispatch={dispatch} />
            ))}
        </tr>
    )
}

export default Tr