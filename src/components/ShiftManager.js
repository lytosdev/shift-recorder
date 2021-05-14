import React, { useRef, useState, useContext } from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import ShiftContext from '../context/Shift/ShiftContext'

// components
import NewShift from './NewShift'
import ShiftItem from './ShiftItem'

// styles
import { List, FAB, Appbar, Button, Text, Colors } from 'react-native-paper'

const ShiftManager = () => {

    const { shifts, showModal, setShiftModal } = useContext(ShiftContext)

    const blankShift = {
        id: 0,
        name: "",
        inTime: "",
        outTime: "",
        wholeDay: false,
        color: "color1"
    }

    return (
        <>
            <NewShift />
            <Appbar.Header style={{ justifyContent: "flex-end" }}>
                <Appbar.Action
                    icon="plus"
                    onPress={() => {
                        setShiftModal(blankShift)
                        showModal(true)
                    }}
                />
            </Appbar.Header>
            <ScrollView>
                <View>
                    {
                        shifts.map(e => <ShiftItem
                            key={e.id}
                            id={e.id}
                            name={e.name}
                            inTime={e.inTime}
                            outTime={e.outTime}
                            wholeDay={e.wholeDay}
                            color={e.color}
                        />)
                    }
                </View>
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({

})

export default ShiftManager