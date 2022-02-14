import { GET_SHIFTS, ADD_SHIFT, EDIT_SHIFT, REMOVE_SHIFT, SET_COLOR } from "./ShiftActions"

export default function ShiftReducer(state, action) {
    const { type, payload } = action

    switch (type) {
        case GET_SHIFTS:
            return {
                ...state
            }
        case ADD_SHIFT:
            const newShift = { ...payload, id: state.shifts.length + 1 }
            return {
                ...state,
                shifts: [...state.shifts, newShift],
                visibleModal: false
            }
        case EDIT_SHIFT:
            var newShifts = []
            state.shifts.forEach(e => {
                e.id === payload.id ?
                    newShifts = [...newShifts, { ...payload }]
                    :
                    newShifts.push(e)
            })
            return {
                ...state,
                shifts: newShifts,
                visibleModal: false
            }
        case REMOVE_SHIFT:
            var newShifts = state.shifts.filter(e => e.id !== payload.id)
            return {
                ...state,
                shifts: newShifts
            }
        case SET_COLOR:
            var newColors = []
            state.colors.forEach(e => {
                e.key === payload.key ?
                    newColors = [...newColors, { ...payload }]
                    :
                    newColors.push(e)
            })
            return {
                ...state,
                colors: newColors
            }
        default:
            return state
    }

}