import React, { useReducer } from 'react'
import moment from 'moment'

import MonthContext from './MonthContext'
import MonthReducer from './MonthReducer'
import { GET, ADD, EDIT, REMOVE } from "./MonthActions"


export default function MonthProvider(props) {

    const initialState = {
        month: ""
    }

    const [state, dispatch] = useReducer(MonthReducer, initialState)

    const add = (month) => {
        dispatch({ type: ADD, payload: month })
    }

    const edit = () => {
        dispatch({ type: EDIT, payload: {} })
    }

    const remove = () => {
        dispatch({ type: REMOVE, payload: {} })
    }

    return (
        <MonthContext.Provider
            value={{
                month: state.month,
                add
            }}
        >
            {props.children}
        </MonthContext.Provider>
    )
}