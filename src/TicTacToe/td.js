import React, {useCallback} from "react";
import {ACTION_TYPE} from "./TicTacToe"

const Td = ({rowIndex, cellIndex, cellData, dispatch}) => {
    const onClickTd = useCallback(() => {
        console.log(rowIndex, cellIndex)
        if(cellData)
            return
            
        dispatch({type: ACTION_TYPE.CLICK_CELL, row: rowIndex, cell: cellIndex})
    }, [cellData])

    return(
        <td onClick={onClickTd}>{cellData}</td>
    )
}

export default Td