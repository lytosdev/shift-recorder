import React, { useContext } from 'react'
import { StyleSheet, View } from 'react-native'
import ShiftContext from '../context/Shift/ShiftContext'

// styles
import { List, IconButton, Badge } from 'react-native-paper'

const ShiftItem = ({ id, name, inTime, outTime, wholeDay, color }) => {

    const { removeShift, showModal, setShiftModal, colors } = useContext(ShiftContext)

    const getColor = colors.find(e => e.key == color)

    return (
        <List.Item
            style={styles.listItem}
            title={name}
            description={
                wholeDay ?
                    "Todo el día"
                    :
                    `Entrada ${inTime}... Salida ${outTime}`
            }
            left={() => <Badge style={[{ backgroundColor: getColor.value }, styles.badge]}></Badge>}
            right={props => <>
                <IconButton
                    {...props}
                    icon="pencil"
                    size={25}
                    onPress={() => {
                        setShiftModal({ id, name, inTime, outTime, wholeDay, color })
                        showModal(true)
                    }}
                />
                <IconButton
                    {...props}
                    icon="delete"
                    size={25}
                    onPress={() => removeShift({ id, name, inTime, outTime, wholeDay, color })}
                />
            </>}
        />
    )
}

const styles = StyleSheet.create({
    listItem: {

    },
    badge: {
        alignSelf: "center",
        marginRight: 5
    }
})

export default ShiftItem