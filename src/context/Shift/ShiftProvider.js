import React, { useReducer } from 'react'
import colors from '../../assets/colors';

import ShiftContext from './ShiftContext'
import ShiftReducer from './ShiftReducer'

import { GET_SHIFTS, ADD_SHIFT, EDIT_SHIFT, REMOVE_SHIFT, SHOW_MODAL, SET_SHIFT_MODAL, SET_COLOR } from "./ShiftActions";

const ShiftProvider = (props) => {

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
        ],
        visibleModal: false,
        shiftModal: null,
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

    const showModal = visibleModal => {
        dispatch({ type: SHOW_MODAL, payload: visibleModal })
    }

    const setShiftModal = shift => {
        dispatch({ type: SET_SHIFT_MODAL, payload: shift })
    }

    const setColor = (key, value) => {
        dispatch({ type: SET_COLOR, payload: {key, value} })
    }

    return (
        <ShiftContext.Provider
            value={{
                shifts: state.shifts,
                visibleModal: state.visibleModal,
                shiftModal: state.shiftModal,
                colors: state.colors,
                addShift,
                editShift,
                removeShift,
                showModal,
                setShiftModal,
                setColor
            }}
        >
            {props.children}
        </ShiftContext.Provider>
    )
}

export default ShiftProvider