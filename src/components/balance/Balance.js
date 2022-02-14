import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'

// components
import ToggleButton from '@components/tests/ToggleButton'

// styles
import { Button, Appbar, Text } from 'react-native-paper'


export default function Balance({ navigation }) {


    return (
        <View style={styles.container}>

            <Appbar.Header>
                <Appbar.Content title="Balance" />
            </Appbar.Header>

            <View style={{ flex: 1 }}>
                <ToggleButton onPress={() => console.log("pressed")} style={{ flex: 1, backgroundColor: "orange" }}>
                    <View style={{ backgroundColor: "red", height: 100, width: 100 }} />
                </ToggleButton>
            </View>

        </View >
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1
    }

})