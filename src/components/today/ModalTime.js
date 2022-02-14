import React, { useState, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import moment from 'moment'

// components
import { TextInputMask } from 'react-native-masked-text'

// styles
import { Portal, Modal, TextInput, Button, Text } from 'react-native-paper'


export default function ModalShift({ visible, data, shift, accept, cancel }) {

    const [time, setTime] = useState("")

    useEffect(() => {
        setTime(moment().format("HH:mm"))
    }, [visible])

    const thisAccept = () => {
        if (data.type === "inTime") {
            accept({ ...shift, inTimeReal: time })
        } else {
            accept({ ...shift, outTimeReal: time })
        }
    }

    const thisCancel = () => {
        cancel()
    }

    const mask = (props) =>
        <TextInputMask
            {...props}
            type={'custom'}
            options={{
                mask: "99:99"
            }}
            onChangeText={text => {
                props.onChangeText?.(text)
            }}
        />

    return (
        <Portal>
            <Modal visible={visible} onDismiss={thisCancel} contentContainerStyle={styles.container}>

                <Text>{data.question}</Text>
                <TextInput
                    style={styles.textInput}
                    keyboardType="numeric"
                    value={time}
                    onChangeText={text => setTime(text)}
                    render={props => mask(props)}
                />
                <View style={styles.buttonZone}>
                    <Button onPress={thisAccept}>
                        Aceptar
                    </Button>
                    <Button onPress={thisCancel}>
                        Cancelar
                    </Button>
                </View>

            </Modal>
        </Portal>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 30,
        backgroundColor: "white"
    },
    textInput: {
        marginTop: 10
    },
    buttonZone: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginTop: 30
    }
})

ModalShift.propTypes = {
    visible: PropTypes.bool,
    data: PropTypes.shape({
        question: PropTypes.string.isRequired,
        type: PropTypes.oneOf(["inTime", "outTime"]).isRequired
    }),
    shift: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        inTime: PropTypes.string.isRequired,
        outTime: PropTypes.string.isRequired,
        wholeDay: PropTypes.bool.isRequired,
        color: PropTypes.string.isRequired,
        inTimeReal: PropTypes.string.isRequired,
        outTimeReal: PropTypes.string.isRequired
    }),
    accept: PropTypes.func,
    cancel: PropTypes.func
}
