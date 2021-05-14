import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'

import moment from 'moment'

// components
import DayOfMonth from './DayOfMonth'

// styles
import { Appbar, Text, Button, Colors, Paragraph } from 'react-native-paper'

const MonthView = () => {

    const weekDay = (day, style) => <Paragraph style={style}>{day}</Paragraph>
    const [date, setDate] = useState(moment())
    const days = getDays(date.format("M"), date.format("YYYY"))

    return (
        <View style={styles.container}>
            <Appbar.Header style={styles.currentDate}>
                <Appbar.Action
                    icon="chevron-left"
                    onPress={() => setDate(moment(date).subtract(1, "month"))}
                />
                <Button>
                    <Text style={{ color: Colors.white, textTransform: "capitalize" }}>
                        {date.format("MMMM")} {date.format("YYYY")}
                    </Text>
                </Button>
                <Appbar.Action
                    icon="chevron-right"
                    onPress={() => setDate(moment(date).add(1, "month"))}
                />
            </Appbar.Header>
            <View style={styles.calendar}>
                <View style={styles["calendar-sem"]}>
                    {weekDay("Lun", styles["calendar-sem-day"])}
                    {weekDay("Mar", styles["calendar-sem-day"])}
                    {weekDay("Mie", styles["calendar-sem-day"])}
                    {weekDay("Jue", styles["calendar-sem-day"])}
                    {weekDay("Vie", styles["calendar-sem-day"])}
                    {weekDay("Sab", styles["calendar-sem-day"])}
                    {weekDay("Dom", styles["calendar-sem-day"])}
                </View>
                <View style={styles["calendar-days"]}>
                    {
                        days.map((e, i) =>
                            <DayOfMonth
                                key={i}
                                style={styles["calendar-days-day"]}>{e}
                            </DayOfMonth>
                        )
                    }
                </View>
            </View>
        </View>
    )
}

function getDays(month, year) {

    const firstMondayOfMonth = moment(`1/${month}/${year}`, "D/M/YYYY", true).startOf("month").startOf("isoWeek")
    const lastSundayOfMonth = moment(`1/${month}/${year}`, "D/M/YYYY", true).endOf("month").endOf("isoWeek")
    const days = []

    while (firstMondayOfMonth.isSameOrBefore(lastSundayOfMonth)) {
        const day = firstMondayOfMonth.format("D")
        days.push(day)
        firstMondayOfMonth.add(1, "days")
    }

    return days
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    currentDate: {
        justifyContent: "space-evenly"
    },
    calendar: {
        flex: 1
    },
    "calendar-sem": {
        height: 40,
        flexDirection: "row",
        alignItems: "center",
    },
    "calendar-sem-day": {
        flexBasis: "14.28%",
        paddingLeft: 5
    },
    "calendar-days": {
        flex: 1,
        flexWrap: "wrap",
        flexDirection: "row",
        alignContent: "stretch"
    },
    "calendar-days-day": {
        flexBasis: "14.28%"
    }
})

export default MonthView;