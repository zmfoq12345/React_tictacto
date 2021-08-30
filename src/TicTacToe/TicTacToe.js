import React, { useEffect, useReducer, useCallback } from "react";
import Table from './Table';

const initState = {
    winner: '', 
    turn: 'O',
    recentCell: [-1, -1],
    tableData: [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ]
}

export const ACTION_TYPE = {
    SET_WINNER: 'SET_WINNER',
    CLICK_CELL: 'CLICK_CELL',
    CHANGE_TURN:'CHANGE_TURN',
    RESET_GAME: 'RESET_GAME'
}

const reducer = (state, action) => {
    switch (action.type) {
        case ACTION_TYPE.SET_WINNER:
            return { ...state,
                winner: action.winner
            }
            
        case ACTION_TYPE.CLICK_CELL:{
            if(state.winner) return {...state}
            const tableData = [...state.tableData]                
            tableData[action.row] = [...tableData[action.row]]
            tableData[action.row][action.cell] = state.turn;
            console.log(state.turn)
            return { ...state,
                tableData,
                recentCell: [action.row, action.cell]
            }
        }
            
        case ACTION_TYPE.CHANGE_TURN:
            return{ ...state,
                turn: state.turn === 'O' ? 'X' : 'O',
            }
        
        case ACTION_TYPE.RESET_GAME:
            return{ 
                ...initState
            }
        default :
            return { ...state }
    }
}

const TicTacToe = () => {
    const [state, dispatch] = useReducer(reducer, initState)
    const {winner, turn, recentCell, tableData} = state;
 
    const onClickTable = useCallback(() =>{
        dispatch({type: ACTION_TYPE.WINNER, winner: turn})
    }, [])

    const onClickReset = useCallback(() =>{
        dispatch({type: ACTION_TYPE.RESET_GAME})
    }, [])

    useEffect(()=>{
        const [row, cell] = recentCell
        if (row < 0 || cell < 0) return

        let isWin = false
        if (tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn){
            isWin = true
        }
        if (tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] === turn){
            isWin = true
        }
        if (tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn){
            isWin = true
        }
        if (tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn){
            isWin = true
        }

        if(isWin){
            dispatch({type: ACTION_TYPE.SET_WINNER, winner: turn})
            // dispatch({type: ACTION_TYPE.RESET_GAME})
        }else{
            let isDraw = true
            tableData.forEach((row)=>{
                row.forEach((cell)=>{
                    if(!cell) isDraw = false
                })
            })

            if(isDraw){
                dispatch({type: ACTION_TYPE.SET_WINNER, winner: '='})
            }
            else{
                dispatch({type: ACTION_TYPE.CHANGE_TURN})
            }
        }


    }, [recentCell])
    
    return(
    <>
        <Table onClick={onClickTable} tableData={tableData} dispatch={dispatch}/>
        {winner && <div>{winner === '=' ? 'Draw...': `${winner} Win!`}</div>}
        {<button onClick={onClickReset}><span>Reset</span></button>}
    </>
    )
}

export default TicTacToe