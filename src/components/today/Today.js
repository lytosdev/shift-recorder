import React, { useState, useContext } from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import moment from 'moment'
import DayContext from '@context/day/DayContext'
import OnStartContext from '@context/onStart/OnStartContext'

// components
import ListItemChop from '../shared/ListItemChop'
import ModalTime from './ModalTime'

// styles
import { Appbar } from 'react-native-paper'


export default function Today({ navigation, route }) {

    const { shiftsByDay, editShift } = useContext(DayContext)
    const { setFreeHeightWithBars } = useContext(OnStartContext)

    const initialModalTime = {
        visible: false,
        data: {
            question: "",
            type: "inTime"
        },
        shift: {
            id: 0,
            name: "",
            inTime: "08:00",
            outTime: "14:00",
            wholeDay: false,
            color: "color1",
            inTimeReal: "",
            outTimeReal: ""
        }
    }
    const [modalTime, setModalTime] = useState(initialModalTime)

    const thisAdd = shift => {
        editShift(moment().format("DD/MM/YYYY"), shift)
        setModalTime({ ...modalTime, visible: false })
    }

    const newDayShifts = shiftsByDay?.find(e => e.day === moment().format("DD/MM/YYYY"))?.shifts

    return (
        <>

            <ModalTime
                visible={modalTime.visible}
                data={modalTime.data}
                shift={modalTime.shift}
                accept={thisAdd}
                cancel={() => setModalTime({ ...modalTime, visible: false })}
            />

            <View style={styles.container}>

                <Appbar.Header>
                    <Appbar.Content title={moment().format("DD MMMM YYYY")} />
                </Appbar.Header>

                <ScrollView
                    onLayout={({
                        nativeEvent: {
                            layout: { height: h }
                        }
                    }) => setFreeHeightWithBars(h)}
                >
                    {
                        newDayShifts?.map(shift =>
                            <ListItemChop
                                key={shift.id}
                                shift={shift}
                                inPressed={() => setModalTime({ visible: true, data: { question: "¿Es correcta la hora de entrada?", type: "inTime" }, shift })}
                                outPressed={() => setModalTime({ visible: true, data: { question: "¿Es correcta la hora de salida?", type: "outTime" }, shift })}
                                style={{ marginBottom: 20 }}
                            />
                        )
                    }
                </ScrollView>

            </View>

        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})