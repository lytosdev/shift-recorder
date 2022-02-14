import React, { memo, useContext } from 'react'
import { StyleSheet, View } from 'react-native'
import moment from 'moment'
import PropTypes from 'prop-types'
import DayContext from '@context/day/DayContext'

// components
import DayMonth from '@components/month/DayMonth'


function CreateMonth({ date, height, width }) {

    const { shiftsByDay } = useContext(DayContext)

    const firstMondayMonth = moment(date, "MMYYYY").startOf("month").startOf("isoWeek")
    const lastSundayMonth = moment(date, "MMYYYY").endOf("month").endOf("isoWeek")

    const dayHeight = height / ((lastSundayMonth.diff(firstMondayMonth, "days") + 1) / 7)
    const dayWidth = width / 7

    const days = []
    let key = 0

    while (firstMondayMonth.isSameOrBefore(lastSundayMonth)) {
        const newDay = firstMondayMonth.format("DD/MM/YYYY")
        // dayShifts puede ser undefined, un array vacío o un array de objetos.
        const dayShifts = shiftsByDay?.find(e => e.day === newDay)?.shifts
        days.push(
            <DayMonth
                key={`${key}${newDay.replace(/\//g, "")}`}
                date={newDay}
                shifts={!dayShifts ? [] : [...dayShifts]}
                height={dayHeight}
                width={dayWidth}
            />
        )
        firstMondayMonth.add(1, "days")
        key++
    }

    return (
        <View style={[styles.container, { height, width }]}>
            {days}
        </View>
    )
}

export default memo(CreateMonth)

const styles = StyleSheet.create({

    container: {
        flexDirection: "row",
        flexWrap: "wrap"
    }

})

CreateMonth.propTypes = {
    date: PropTypes.string.isRequired,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired
}