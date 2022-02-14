import React, { useReducer } from 'react'
import colors from '../../assets/colors'

import ShiftContext from './ShiftContext'
import ShiftReducer from './ShiftReducer'

import { GET_SHIFTS, ADD_SHIFT, EDIT_SHIFT, REMOVE_SHIFT, SET_COLOR } from "./ShiftActions"

export default function ShiftProvider(props) {

    const initialState = {
        shifts: [
            {
                id: 1,
                name: "Mañana 1",
                inTime: "09:00",
                outTime: "14:00",
                wholeDay: false,
                color: "color2"
            },
            {
                id: 2,
                name: "Tarde 1",
                inTime: "16:00",
                outTime: "21:00",
                wholeDay: false,
                color: "color6"
            },
            {
                id: 3,
                name: "Doble",
                inTime: "10:00",
                outTime: "21:00",
                wholeDay: false,
                color: "color5"
            },
            {
                id: 4,
                name: "Tarde 2",
                inTime: "15:00",
                outTime: "17:00",
                wholeDay: false,
                color: "color10"
            },
            {
                id: 5,
                name: "Tarde 3",
                inTime: "18:00",
                outTime: "22:00",
                wholeDay: false,
                color: "color12"
            }
        ],
        colors: colors
    }

    const [state, dispatch] = useReducer(ShiftReducer, initialState)

    const addShift = shift => {
        dispatch({ type: ADD_SHIFT, payload: shift })
    }

    const editShift = shift => {
        dispatch({ type: EDIT_SHIFT, payload: shift })
    }

    const removeShift = shift => {
        dispatch({ type: REMOVE_SHIFT, payload: shift })
    }

    const setColor = (key, value) => {
        dispatch({ type: SET_COLOR, payload: { key, value } })
    }

    return (
        <ShiftContext.Provider
            value={{
                shifts: state.shifts,
                colors: state.colors,
                addShift,
                editShift,
                removeShift,
                setColor
            }}
        >
            {props.children}
        </ShiftContext.Provider>
    )
}