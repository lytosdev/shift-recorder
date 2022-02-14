import React, { useContext } from 'react'
import { StyleSheet } from 'react-native'
import ShiftContext from '../../context/shift/ShiftContext'

// styles
import { Badge } from 'react-native-paper'

export default function Shift({ style, inTime, outTime, color, badgeSize }) {

    const { colors } = useContext(ShiftContext)
    const getColor = colors.find(e => e.key == color)

    return (
        <Badge
            size={badgeSize}
            style={[
                styles.badge,
                {
                    ...style,
                    backgroundColor: getColor.value
                }
            ]}
        >
            {inTime}-{outTime}
        </Badge>
    )
}

const styles = StyleSheet.create({
    container: {

    },
    badge: {
        alignSelf: "stretch",
        fontSize: 8
    }
})