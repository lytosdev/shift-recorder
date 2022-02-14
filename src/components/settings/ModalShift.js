import React, { useState, useEffect, useContext, useRef } from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import ShiftContext from '../../context/shift/ShiftContext'
import PropTypes from 'prop-types'

// components
import { ColorPicker } from 'react-native-color-picker'
import Timer from '../shared/Timer'

// styles
import { Portal, Modal, TextInput, Button, HelperText, Subheading, Switch, Drawer, useTheme } from 'react-native-paper'


export default function ModalShift({ visible, shift, addShift, editShift, cancel }) {

    const { colors, setColor } = useContext(ShiftContext)

    const [isNew, setIsNew] = useState(false)
    const [errorShiftName, setErrorShiftName] = useState("")
    const [visibleColorPicker, setVisibleColorPicker] = useState(false)
    const [thisShift, setThisShift] = useState(shift)
    const [posColor, setPosColor] = useState(0)

    const scrollRef = useRef()

    useEffect(() => {
        scrollRef?.current?.scrollTo({ x: posColor, animated: true })
    }, [posColor])

    useEffect(() => {
        shift.id === 0 ? setIsNew(true) : setIsNew(false)
        setThisShift(shift)
    }, [shift])

    const getColor = colors.find(color => color.key == thisShift.color)

    const setValueToState = (name, value) => {
        setThisShift({ ...thisShift, [name]: value })
    }

    const validShiftName = text => {

        if (text === "") {
            setErrorShiftName("El nombre del turno no puede estar vacío")
        } else if (text.length > 20) {
            setErrorShiftName("El nombre del turno no puede tener más de 20 caracteres")
        } else {
            setErrorShiftName("")
        }

    }

    const thisAddShift = () => {

        if (errorShiftName === "") {
            if (thisShift.name !== "") {
                addShift(thisShift)
            } else {
                setErrorShiftName("El nombre del turno no puede estar vacío")
            }
        }

    }

    const thisEditShift = () => {

        if (errorShiftName === "") {
            if (thisShift.name !== "") {
                editShift(thisShift)
            } else {
                setErrorShiftName("El nombre del turno no puede estar vacío")
            }
        }

    }

    const thisClosed = () => {
        setVisibleColorPicker(false)
        setErrorShiftName("")
        setPosColor(0)
        cancel()
    }

    return (
        <Portal>
            <Modal visible={visible} onDismiss={thisClosed} contentContainerStyle={styles.container}>

                <View style={styles.colorZone}>
                    <View style={styles['colorZone-head']}>
                        <Subheading>Elige un color</Subheading>
                        <Button
                            compact
                            labelStyle={{ textTransform: "lowercase" }}
                            onPress={() => setVisibleColorPicker(!visibleColorPicker)}
                        >
                            editar
                        </Button>
                    </View>
                    <ScrollView horizontal ref={scrollRef}>
                        <View style={styles['colorZone-colors']}>
                            {
                                colors.map(({ key, value }) =>
                                    <Drawer.Item
                                        key={key}
                                        style={[
                                            styles['colorZone-color'],
                                            {
                                                backgroundColor: value,
                                                borderWidth: thisShift.color === key ? 3 : 0
                                            }
                                        ]}
                                        onPress={() => setValueToState("color", key)}
                                        onLayout={event => { if (thisShift.color === key) setPosColor(event.nativeEvent.layout.x) }}
                                    />
                                )
                            }
                        </View>
                    </ScrollView>
                </View>

                <ColorPicker
                    style={{ display: visibleColorPicker ? "flex" : "none", height: 300 }}
                    hideSliders={!visibleColorPicker}
                    oldColor={getColor.value}
                    onColorSelected={color => {
                        setColor(getColor.key, color)
                        setVisibleColorPicker(false)
                    }}
                />

                <View style={{ display: visibleColorPicker ? "none" : "flex" }}>

                    <View style={styles.textZone}>
                        <TextInput
                            label="Nombre del turno"
                            value={thisShift.name}
                            onChangeText={text => {
                                validShiftName(text)
                                setValueToState("name", text)
                            }}
                        />
                        <HelperText type="error" visible={errorShiftName !== ""} style={{ alignSelf: "center" }}>
                            {errorShiftName}
                        </HelperText>
                    </View>

                    <View style={styles.switchZone}>
                        <View style={styles['switchZone-head']}>
                            <Subheading>Todo el día</Subheading>
                            <Switch
                                value={thisShift.wholeDay}
                                onValueChange={() => setValueToState("wholeDay", !thisShift.wholeDay)}
                                color={useTheme().colors.accent}
                            />
                        </View>
                        <View style={[styles['switchZone-times'], { display: thisShift.wholeDay ? "none" : "flex" }]}>
                            <View style={styles['switchZone-time']}>
                                <Subheading>Hora de entrada:</Subheading>
                                <Timer value={thisShift.inTime} onValueChanged={time => setValueToState("inTime", time)} />
                            </View>
                            <View style={[styles['switchZone-time'], { marginTop: 10 }]}>
                                <Subheading>Hora de Salida:</Subheading>
                                <Timer value={thisShift.outTime} onValueChanged={time => setValueToState("outTime", time)} />
                            </View>
                        </View>
                    </View>

                    <View style={styles.buttonZone}>
                        {
                            isNew ?
                                <Button onPress={thisAddShift}>
                                    Añadir
                                </Button>
                                :
                                <Button onPress={thisEditShift}>
                                    Actualizar
                                </Button>
                        }
                        <Button onPress={thisClosed}>
                            Cancelar
                        </Button>
                    </View>

                </View>

            </Modal>
        </Portal>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "white"
    },
    colorZone: {

    },
    "colorZone-head": {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    "colorZone-colors": {
        flexDirection: "row",
        paddingTop: 1,
        paddingBottom: 5
    },
    "colorZone-color": {
        borderColor: "black",
        width: 50,
        height: 30,
        alignSelf: "flex-start",
        marginLeft: 0,
        marginRight: 5,
        marginTop: 0,
        marginBottom: 0
    },
    textZone: {
        marginTop: 30
    },
    switchZone: {
        marginTop: 30
    },
    "switchZone-head": {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    "switchZone-times": {
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20
    },
    "switchZone-time": {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    buttonZone: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginTop: 30
    }
})

ModalShift.propTypes = {
    visible: PropTypes.bool,
    shift: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        inTime: PropTypes.string.isRequired,
        outTime: PropTypes.string.isRequired,
        wholeDay: PropTypes.bool.isRequired,
        color: PropTypes.string.isRequired
    }),
    addShift: PropTypes.func,
    editShift: PropTypes.func,
    cancel: PropTypes.func
}
