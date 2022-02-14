import { GET, ADD, EDIT, REMOVE } from "./MonthActions"

export default function MonthReducer(state, action) {
    const { type, payload } = action

    switch (type) {
        case GET:
            return {
                ...state,
            }
        case ADD:
            return {
                ...state,
                month: payload
            }
        case EDIT:
            return {
                ...state,
            }
        case REMOVE:
            return {
                ...state,
            }
        default:
            return state
    }

}