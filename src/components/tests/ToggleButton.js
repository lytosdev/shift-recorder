import React, { useState } from 'react'
import { StyleSheet, View, Button } from 'react-native'
import { TapGestureHandler, State } from 'react-native-gesture-handler'

// components

// styles
import { Appbar } from 'react-native-paper'


export default function ToggleButton({ onPress, children, style }) {

    const [isChecked, setIsChecked] = useState(false)

    const handleStateChange = ({ nativeEvent }) => {
        if (nativeEvent.state === State.END) {
            onPress?.()
            setIsChecked(!isChecked)
        }
    }

    return (
        <TapGestureHandler onHandlerStateChange={handleStateChange}>
            <View style={style}>
                {children}
                <View
                    style={{
                        ...StyleSheet.absoluteFill,
                        backgroundColor: isChecked ? "grey" : "",
                        opacity: isChecked ? 0.2 : 0
                    }}
                />
            </View>
        </TapGestureHandler>
    )
}

const styles = StyleSheet.create({

    container: {

    }

})