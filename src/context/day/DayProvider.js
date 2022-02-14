import React, { useReducer } from 'react'

import DayContext from './DayContext'
import DayReducer from './DayReducer'

import { GET_SHIFTS, ADD_SHIFT, EDIT_SHIFT, REMOVE_SHIFT } from "./DayActions"

export default function DayProvider(props) {

    const initialState = {
        shiftsByDay: [
            {
                day: "18/05/2021",
                shifts: [
                    {
                        id: 1,
                        name: "Mañana 1",
                        inTime: "09:00",
                        outTime: "14:00",
                        wholeDay: false,
                        color: "color2",
                        inTimeReal: "",
                        outTimeReal: ""
                    },
                    {
                        id: 2,
                        name: "Tarde 1",
                        inTime: "16:00",
                        outTime: "21:00",
                        wholeDay: false,
                        color: "color6",
                        inTimeReal: "",
                        outTimeReal: ""
                    },
                    {
                        id: 3,
                        name: "Doble",
                        inTime: "10:00",
                        outTime: "21:00",
                        wholeDay: false,
                        color: "color5",
                        inTimeReal: "",
                        outTimeReal: ""
                    },
                    {
                        id: 5,
                        name: "Tarde 3",
                        inTime: "18:00",
                        outTime: "22:00",
                        wholeDay: false,
                        color: "color12",
                        inTimeReal: "",
                        outTimeReal: ""
                    }
                ]
            },
            {
                day: "24/06/2021",
                shifts: [
                    {
                        id: 1,
                        name: "Mañana 1",
                        inTime: "09:00",
                        outTime: "14:00",
                        wholeDay: false,
                        color: "color2",
                        inTimeReal: "",
                        outTimeReal: ""
                    }
                ]
            }
        ]
    }

    const [state, dispatch] = useReducer(DayReducer, initialState)

    const addShift = (day, shift) => {
        dispatch({ type: ADD_SHIFT, payload: { day, shift } })
    }

    const editShift = (day, shift) => {
        dispatch({ type: EDIT_SHIFT, payload: { day, shift } })
    }

    const removeShift = (day, shift) => {
        dispatch({ type: REMOVE_SHIFT, payload: { day, shift } })
    }

    return (
        <DayContext.Provider
            value={{
                shiftsByDay: state.shiftsByDay,
                addShift,
                editShift,
                removeShift
            }}
        >
            {props.children}
        </DayContext.Provider>
    )
}