import React, { useState, useEffect, useContext, usePrevious } from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import ShiftContext from '../context/Shift/ShiftContext'

// styles
import { Portal, Modal, Text, TextInput, Button, Badge, Subheading, Switch, Drawer } from 'react-native-paper'
import { TextInputMask } from 'react-native-masked-text'
import { ColorPicker } from 'react-native-color-picker'


const NewShift = () => {

    const { visibleModal, shiftModal, showModal, addShift, editShift, setShiftModal, colors, setColor } = useContext(ShiftContext)
    const [isNew, setIsNew] = useState(false)
    const [visiblePicker, setVisiblePicker] = useState(false)

    useEffect(() => {
        shiftModal?.id === 0 ? setIsNew(true) : setIsNew(false)
    }, [visibleModal])

    const setValueToState = (name, value) => {
        setShiftModal({ ...shiftModal, [name]: value })
    }

    const thisClosed = () =>{
        showModal(false)
        setVisiblePicker(false)
    }

    const mask = (props) => <TextInputMask
        {...props}
        type={'custom'}
        options={{
            mask: "99:99"
        }}
        onChangeText={text => {
            props.onChangeText?.(text)
        }}
    />

    const getColor = colors.find(e => e.key == shiftModal?.color)

    return (
        <Portal>
            <Modal
                visible={visibleModal}
                onDismiss={thisClosed}
                contentContainerStyle={styles.containerStyle}>

                <View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Subheading>Elige un color</Subheading>
                        <Button
                            compact
                            labelStyle={{ textTransform: "lowercase" }}
                            onPress={() => setVisiblePicker(!visiblePicker)}
                        >
                            editar
                            </Button>
                    </View>
                    <ScrollView horizontal style={{ marginBottom: 20 }}>
                        <View style={styles.drawer}>
                            {
                                colors.map(({key, value}) => <Drawer.Item
                                    key={key}
                                    style={[styles["drawer-color"], { backgroundColor: value, borderWidth: shiftModal?.color === key ? 2 : 0 }]}
                                    onPress={() => setValueToState("color", key)}
                                />)
                            }
                        </View>
                    </ScrollView>
                </View>

                <ColorPicker
                    style={{ display: visiblePicker ? "flex" : "none", height: 300 }}
                    hideSliders={!visiblePicker}
                    oldColor={getColor?.value}
                    onColorSelected={color => {
                        setColor(getColor.key, color)
                        setVisiblePicker(false)
                    }}
                />

                <View style={{ display: visiblePicker ? "none" : "flex" }}>

                    <TextInput
                        style={styles.textInput}
                        label="Nombre del turno"
                        value={shiftModal?.name}
                        onChangeText={text => setValueToState("name", text)}
                    />

                    <View style={styles.switchZone}>
                        <Subheading>Todo el día</Subheading>
                        <Switch value={shiftModal?.wholeDay} onValueChange={() => setValueToState("wholeDay", !shiftModal.wholeDay)} />
                    </View>
                    <View style={{ padding: 5, display: shiftModal?.wholeDay ? "none" : "flex" }}>
                        <TextInput
                            style={styles.textInput}
                            keyboardType="numeric"
                            label="Hora de entrada"
                            value={shiftModal?.inTime}
                            onChangeText={text => setValueToState("inTime", text)}
                            render={props => mask(props)}
                        />
                        <TextInput
                            style={styles.textInput}
                            keyboardType="numeric"
                            label="Hora de salida"
                            value={shiftModal?.outTime}
                            onChangeText={text => setValueToState("outTime", text)}
                            render={props => mask(props)}
                        />
                    </View>

                    <View style={{ flexDirection: "row", justifyContent: "space-evenly", marginTop: 20 }}>
                        {
                            isNew ?
                                <Button onPress={() => addShift(shiftModal)}>
                                    Añadir
                            </Button>
                                :
                                <Button onPress={() => editShift(shiftModal)}>
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
    containerStyle: {
        padding: 20,
        backgroundColor: "white",
        justifyContent: "space-between"
    },
    drawer: {
        flexDirection: "row"
    },
    "drawer-color": {
        borderColor: "black",
        width: 50,
        height: 30,
        alignSelf: "flex-start",
        marginLeft: 0,
        marginRight: 5,
        marginTop: 5,
        marginBottom: 5
    },
    switchZone: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 20
    },
    textInput: {
        marginBottom: 10
    }
})

export default NewShift
