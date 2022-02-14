import React, { useState, useContext, useEffect } from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import ShiftContext from '../../context/shift/ShiftContext'

// components
import ListItemShift from '../shared/ListItemShift'
import ModalShift from './ModalShift'

// styles
import { IconButton, useTheme } from 'react-native-paper'


export default function ShiftManager({ navigation, route }) {

    const { shifts, addShift, editShift, removeShift } = useContext(ShiftContext)

    const initialModalShift = {
        visible: false,
        shift: {
            id: 0,
            name: "",
            inTime: "08:00",
            outTime: "14:00",
            wholeDay: false,
            color: "color1"
        }
    }
    const [modalShift, setModalShift] = useState(initialModalShift)

    const addButtonColor = useTheme().colors.primary
    useEffect(() => {
        navigation.setOptions({
            headerRight: () =>
                <IconButton
                    icon="plus"
                    color={addButtonColor}
                    onPress={() => setModalShift({ visible: true, shift: initialModalShift.shift })}
                />
        })
    }, [navigation])

    const thisAddShift = shift => {
        addShift(shift)
        setModalShift({ ...modalShift, visible: false })
    }

    const thisEditShift = shift => {
        editShift(shift)
        setModalShift({ ...modalShift, visible: false })
    }

    return (
        <>
            <ModalShift
                visible={modalShift.visible}
                shift={modalShift.shift}
                addShift={thisAddShift}
                editShift={thisEditShift}
                cancel={() => setModalShift({ ...modalShift, visible: false })}
            />
            <ScrollView>
                <View>
                    {
                        shifts.map(shift =>
                            <ListItemShift
                                key={shift.id}
                                shift={shift}
                                right=
                                {<>
                                    <IconButton icon="pencil" onPress={() => setModalShift({ visible: true, shift })} />
                                    <IconButton icon="delete" onPress={() => removeShift(shift)} />
                                </>}
                            />
                        )
                    }
                </View>
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {

    }
})