import React, { useState, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import DropDown from 'react-native-paper-dropdown'

// styles
import { Text } from 'react-native-paper'


export default function Timer({ value, onValueChanged }) {

    const [showDropDownHour, setShowDropDownHour] = useState(false)
    const [showDropDownMinute, setShowDropDownMinute] = useState(false)
    const [time, setTime] = useState(value)

    useEffect(() => {
        setTime(value)
    }, [value])

    const setHour = (hour) => {
        const minutes = time.substr(-2)
        setTime(`${hour}:${minutes}`)
        onValueChanged(`${hour}:${minutes}`)
    }

    const setMinute = (minutes) => {
        const hour = time.substr(0, 2)
        setTime(`${hour}:${minutes}`)
        onValueChanged(`${hour}:${minutes}`)
    }

    const minutesList = [
        { label: '00', value: '00' },
        { label: '05', value: '05' },
        { label: '10', value: '10' },
        { label: '15', value: '15' },
        { label: '20', value: '20' },
        { label: '25', value: '25' },
        { label: '30', value: '30' },
        { label: '35', value: '35' },
        { label: '40', value: '40' },
        { label: '45', value: '45' },
        { label: '50', value: '50' },
        { label: '55', value: '55' },
    ]
    const hoursList = [
        { label: '00', value: '00' },
        { label: '01', value: '01' },
        { label: '02', value: '02' },
        { label: '03', value: '03' },
        { label: '04', value: '04' },
        { label: '05', value: '05' },
        { label: '06', value: '06' },
        { label: '07', value: '07' },
        { label: '08', value: '08' },
        { label: '09', value: '09' },
        { label: '10', value: '10' },
        { label: '11', value: '11' },
        { label: '12', value: '12' },
        { label: '13', value: '13' },
        { label: '14', value: '14' },
        { label: '15', value: '15' },
        { label: '16', value: '16' },
        { label: '17', value: '17' },
        { label: '18', value: '18' },
        { label: '19', value: '19' },
        { label: '20', value: '20' },
        { label: '21', value: '21' },
        { label: '22', value: '22' },
        { label: '23', value: '23' },
    ]

    return (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
            <DropDown
                mode="flat"
                value={time.substr(0, 2)}
                setValue={e => setHour(e)}
                list={hoursList}
                visible={showDropDownHour}
                showDropDown={() => setShowDropDownHour(true)}
                onDismiss={() => setShowDropDownHour(false)}
            />
            <Text style={{ marginLeft: 5, marginRight: 5 }}>:</Text>
            <DropDown
                mode="flat"
                value={time.substr(- 2)}
                setValue={e => setMinute(e)}
                list={minutesList}
                visible={showDropDownMinute}
                showDropDown={() => setShowDropDownMinute(true)}
                onDismiss={() => setShowDropDownMinute(false)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {

    }
})