import React, { useContext, useEffect } from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import moment from 'moment'
import ShiftContext from '../../context/shift/ShiftContext'
import DayContext from '../../context/day/DayContext'

// components
import ListItemShift from '../shared/ListItemShift'

// styles
import { List, IconButton } from 'react-native-paper'


export default function EditDay({ navigation, route }) {

    const { shifts } = useContext(ShiftContext)
    const { shiftsByDay, addShift, removeShift } = useContext(DayContext)

    const dayShifts = shiftsByDay?.find(shift => shift.day === route.params.date)?.shifts
    const newShifts = shifts?.filter(shift => {
        return !dayShifts?.find(dayShift => dayShift.id === shift.id)
    })

    useEffect(() => {
        navigation.setOptions({
            headerTitle: moment(route.params.date, "DD/MM/YYYY", true).format("DD MMMM YYYY")
        })
    }, [navigation])

    return (
        <View style={styles.container}>

            <List.Section style={{ flex: 1 }}>
                <List.Subheader>Turnos del día</List.Subheader>
                <ScrollView>
                    {
                        dayShifts?.map(shift =>
                            <ListItemShift
                                key={shift.id}
                                shift={shift}
                                right={<IconButton icon="delete" onPress={() => removeShift(route.params.date, shift)} />}
                            />
                        )
                    }
                </ScrollView>
            </List.Section>

            <List.Section style={{ flex: 2 }}>
                <List.Subheader>Añade un turno al día</List.Subheader>
                <ScrollView>
                    {
                        newShifts?.map(shift =>
                            <ListItemShift
                                key={shift.id}
                                shift={shift}
                                right={<IconButton icon="plus-circle" onPress={() => addShift(route.params.date, { ...shift, inTimeReal: "", outTimeReal: "" })} />}
                            />
                        )
                    }
                </ScrollView>
            </List.Section>

        </View>
    )

}

const styles = StyleSheet.create({

    container: {
        flex: 1
    }

})