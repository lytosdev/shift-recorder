import React, { useReducer } from 'react'
import { useWindowDimensions } from 'react-native'

import OnStartContext from './OnStartContext'
import OnStartReducer from './OnStartReducer'

import { SET_FREE_HEIGHT_WITH_BARS } from "./OnStartActions"

export default function OnStartProvider(props) {

    const windowDimensions = useWindowDimensions()

    const initialState = {
        freeHeightWithBars: 0
    }

    const [state, dispatch] = useReducer(OnStartReducer, initialState)

    const setFreeHeightWithBars = height => {
        dispatch({ type: SET_FREE_HEIGHT_WITH_BARS, payload: height })
    }

    return (
        <OnStartContext.Provider
            value={{
                freeHeightWithBars: state.freeHeightWithBars,
                screenWidth: windowDimensions.width,
                setFreeHeightWithBars
            }}
        >
            {props.children}
        </OnStartContext.Provider>
    )
}