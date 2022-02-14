import React, { useState, useContext, useRef } from 'react'
import { StyleSheet, View } from 'react-native'
import moment from 'moment'
import OnStartContext from '@context/onStart/OnStartContext'

// components
import Swiper from '@components/shared/Swiper'
import CreateMonth from '@components/shared/CreateMonth'

// styles
import { Appbar, Text, Colors, Paragraph, Button } from 'react-native-paper'


const weekHeaderHeight = 40

export default function Month({ navigation, route }) {

    const { freeHeightWithBars, screenWidth } = useContext(OnStartContext)
    const HEIGHT = freeHeightWithBars - weekHeaderHeight
    const WIDTH = screenWidth

    const initialState = {
        monthLeft: moment().subtract(1, "months").format("MMYYYY"),
        monthCenter: moment().format("MMYYYY"),
        monthRight: moment().add(1, "months").format("MMYYYY"),
        currentDate: moment(),
        lastTimestamp: moment()
    }
    const [state, setState] = useState(initialState)

    const currentDateRef = useRef()

    const onIndexChanged = (lastIndex, newIndex) => {

        const thisTimestamp = moment()
        const milliseconds = thisTimestamp.diff(state.lastTimestamp)

        const { currentDate, monthLeft, monthCenter, monthRight } = createNewDate(lastIndex, newIndex, state)
        currentDateRef.current = currentDate

        if (milliseconds > 300) {
            setState({
                ...state,
                currentDate,
                lastTimestamp: thisTimestamp,
                monthLeft,
                monthCenter,
                monthRight
            })
        } else {
            setState({
                ...state,
                currentDate,
                lastTimestamp: thisTimestamp
            })
            setTimeout(() => {
                const thisDate = currentDate.format("MMYYYY")
                const newDate = currentDateRef.current.format("MMYYYY")
                if (thisDate === newDate) {
                    setState({
                        ...state,
                        currentDate,
                        monthLeft,
                        monthCenter,
                        monthRight
                    })
                }
            }, 500)
        }

    }

    return (
        <View style={styles.container}>

            <Appbar.Header style={styles.currentDate}>
                <Appbar.Action
                    icon="chevron-left"
                    onPress={() => console.log("add")}
                />
                <Button>
                    <Text style={{ color: Colors.white, textTransform: "capitalize" }}>
                        {state.currentDate.format("MMMM YYYY")}
                    </Text>
                </Button>
                <Appbar.Action
                    icon="chevron-right"
                    onPress={() => console.log("add")}
                />
            </Appbar.Header>

            <View style={styles.calendar}>

                <View style={styles["calendar-week"]}>
                    {weekDay("Lun", styles["calendar-week-day"])}
                    {weekDay("Mar", styles["calendar-week-day"])}
                    {weekDay("Mie", styles["calendar-week-day"])}
                    {weekDay("Jue", styles["calendar-week-day"])}
                    {weekDay("Vie", styles["calendar-week-day"])}
                    {weekDay("Sab", styles["calendar-week-day"])}
                    {weekDay("Dom", styles["calendar-week-day"])}
                </View>

                <View style={{ flex: 1 }}>
                    <Swiper
                        dataA={<CreateMonth date={state.monthLeft} height={HEIGHT} width={WIDTH} />}
                        dataB={<CreateMonth date={state.monthCenter} height={HEIGHT} width={WIDTH} />}
                        dataC={<CreateMonth date={state.monthRight} height={HEIGHT} width={WIDTH} />}
                        onIndexChanged={onIndexChanged}
                        height={HEIGHT}
                        width={WIDTH}
                    />
                </View>

            </View>

        </View >
    )
}

const createNewDate = (lastIndex, newIndex, state) => {
    if (newIndex === 0) {
        if (lastIndex === 1) {
            return {
                currentDate: state.currentDate.clone().subtract(1, "months"),
                monthLeft: state.currentDate.clone().subtract(1, "months").format("MMYYYY"),
                monthCenter: state.currentDate.format("MMYYYY"),
                monthRight: state.currentDate.clone().subtract(2, "months").format("MMYYYY")
            }
        } else if (lastIndex === 2) {
            return {
                currentDate: state.currentDate.clone().add(1, "months"),
                monthLeft: state.currentDate.clone().add(1, "months").format("MMYYYY"),
                monthCenter: state.currentDate.clone().add(2, "months").format("MMYYYY"),
                monthRight: state.currentDate.format("MMYYYY")
            }
        }
    } else if (newIndex === 1) {
        if (lastIndex === 0) {
            return {
                currentDate: state.currentDate.clone().add(1, "months"),
                monthLeft: state.currentDate.format("MMYYYY"),
                monthCenter: state.currentDate.clone().add(1, "months").format("MMYYYY"),
                monthRight: state.currentDate.clone().add(2, "months").format("MMYYYY")
            }
        } else if (lastIndex === 2) {
            return {
                currentDate: state.currentDate.clone().subtract(1, "months"),
                monthLeft: state.currentDate.clone().subtract(2, "months").format("MMYYYY"),
                monthCenter: state.currentDate.clone().subtract(1, "months").format("MMYYYY"),
                monthRight: state.currentDate.format("MMYYYY")
            }
        }
    } else if (newIndex === 2) {
        if (lastIndex === 0) {
            return {
                currentDate: state.currentDate.clone().subtract(1, "months"),
                monthLeft: state.currentDate.format("MMYYYY"),
                monthCenter: state.currentDate.clone().subtract(2, "months").format("MMYYYY"),
                monthRight: state.currentDate.clone().subtract(1, "months").format("MMYYYY")
            }
        } else if (lastIndex === 1) {
            return {
                currentDate: state.currentDate.clone().add(1, "months"),
                monthLeft: state.currentDate.clone().add(2, "months").format("MMYYYY"),
                monthCenter: state.currentDate.format("MMYYYY"),
                monthRight: state.currentDate.clone().add(1, "months").format("MMYYYY")
            }
        }
    }
}

const weekDay = (day, style) => <Paragraph style={style}>{day}</Paragraph>

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    currentDate: {
        justifyContent: "space-between"
    },
    calendar: {
        flex: 1
    },
    "calendar-week": {
        height: weekHeaderHeight,
        flexDirection: "row",
        alignItems: "center",
    },
    "calendar-week-day": {
        flexBasis: "14.28%",
        paddingLeft: 5
    }
})