import { GET_SHIFTS, ADD_SHIFT, REMOVE_SHIFT, EDIT_SHIFT } from "./DayActions"

export default function DayReducer(state, action) {
    const { type, payload } = action

    switch (type) {
        case GET_SHIFTS:
            return {
                ...state
            }
        case ADD_SHIFT:
            var day = state.shiftsByDay.find(e => e.day === payload.day)
            if (!day) {
                return {
                    ...state,
                    shiftsByDay: [...state.shiftsByDay, { day: payload.day, shifts: [payload.shift] }]
                }
            } else {
                var newDays = state.shiftsByDay.filter(e => e.day !== payload.day)
                day.shifts.push(payload.shift)
                return {
                    ...state,
                    shiftsByDay: [...newDays, day]
                }
            }
        case EDIT_SHIFT:
            var newDays = state.shiftsByDay.filter(e => e.day !== payload.day)
            var day = state.shiftsByDay.find(e => e.day === payload.day)
            var newShifts = day.shifts.map(shift => {
                if (shift.id === payload.shift.id) {
                    return payload.shift
                } else {
                    return shift
                }
            })
            return {
                ...state,
                shiftsByDay: [...newDays, { day: payload.day, shifts: [...newShifts] }]
            }
        case REMOVE_SHIFT:
            var newDays = state.shiftsByDay.filter(e => e.day !== payload.day)
            var day = state.shiftsByDay.find(e => e.day === payload.day)
            var newShifts = day.shifts.filter(e => e.id !== payload.shift.id)
            return {
                ...state,
                shiftsByDay: [...newDays, { day: payload.day, shifts: newShifts }]
            }
        default:
            return state
    }

}