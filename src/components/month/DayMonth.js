import React, { memo } from 'react'
import { StyleSheet, View } from 'react-native'
import moment from 'moment'
import { useNavigation } from '@react-navigation/native'
import PropTypes from 'prop-types'
import _ from 'lodash'

// components
import Shift from '@components/month/Shift'
import ToggleButton from '@components/tests/ToggleButton'

// styles
import { Paragraph, Subheading, useTheme } from 'react-native-paper'


const badgeSize = 17
const marBotDayShift = 2

function DayMonth({ date, shifts, height, width }) {

    const day = date.startsWith("0") ? date.substr(1, 1) : date.substr(0, 2)
    const navigation = useNavigation()
    const { visibleShifts, notVisibleShifts } = shiftsToRender(shifts, height)

    return (
        <ToggleButton
            style={[
                date === moment().format("DD/MM/YYYY") ? styles.currentDay : "",
                { ...styles.container, height, width }
            ]}
            onPress={() => navigation.navigate("EditDay", { date })}
        >
            <>
                <Subheading style={styles.dayNumber}>
                    {day}
                </Subheading>
                <View style={styles.visibleShifts}>
                    {
                        visibleShifts?.map(shift =>
                            <Shift
                                style={styles['visibleShifts-shift']}
                                key={shift.id}
                                inTime={shift.inTime}
                                outTime={shift.outTime}
                                color={shift.color}
                                badgeSize={badgeSize}
                            />
                        )
                    }
                </View>
                <Paragraph
                    style={[styles.notVisibleShifts, { color: useTheme().colors.accent }]}
                >
                    {notVisibleShifts}
                </Paragraph>
            </>
        </ToggleButton>
    )
}

function areEqual(prevProps, nextProps) {

    if (prevProps.date !== nextProps.date)
        return false

    if (prevProps.height !== nextProps.height)
        return false

    if (prevProps.width !== nextProps.width)
        return false

    if (!_.isEqual(prevProps.shifts, nextProps.shifts))
        return false

    return true
}

export default memo(DayMonth, areEqual)

const shiftsToRender = (shifts, heightContainer) => {

    if (!shifts)
        return { shifts: [], notVisibleShifts: "" }

    const heightHead = badgeSize + 5
    const heightBadge = badgeSize + marBotDayShift
    const heightContainerShifts = heightContainer - heightHead
    const maxElements = Math.floor(heightContainerShifts / heightBadge)
    const totalElements = shifts.length

    let notVisible = totalElements - maxElements
    if (notVisible < 0) notVisible = 0
    if (notVisible > 0) notVisible = notVisible + 1
    const visible = totalElements - notVisible

    const tempShifts = []
    for (let i = 0; i < visible; i++) {
        tempShifts.push(shifts[i])
    }

    if (notVisible > 0) {
        return { visibleShifts: tempShifts, notVisibleShifts: `+${notVisible}` }
    } else {
        return { visibleShifts: tempShifts, notVisibleShifts: "" }
    }
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 2,
        paddingRight: 2
    },
    currentDay: {
        borderColor: "black",
        borderWidth: 1
    },
    dayNumber: {
        marginTop: 0,
        marginBottom: 0
    },
    visibleShifts: {
        flex: 1
    },
    "visibleShifts-shift": {
        marginBottom: marBotDayShift
    },
    notVisibleShifts: {
        alignSelf: "flex-end",
        fontSize: 10,
        marginTop: 0,
        marginBottom: 0
    }
})

DayMonth.propTypes = {
    date: PropTypes.string.isRequired,
    shifts: PropTypes.arrayOf(PropTypes.object),
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired
}