import { SET_FREE_HEIGHT_WITH_BARS } from "./OnStartActions"

export default function OnStartReducer(state, action) {
    const { type, payload } = action

    switch (type) {
        case SET_FREE_HEIGHT_WITH_BARS:
            return {
                freeHeightWithBars: payload
            }
        default:
            return state
    }

}