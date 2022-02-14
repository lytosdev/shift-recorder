import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'

// components


// styles
import { Button, Appbar } from 'react-native-paper'


export default function Splash({ navigation, route }) {

    setTimeout(() => navigation.navigate("Home"), 2000)

    return (
        <View style={styles.container}>


        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        ...StyleSheet.absoluteFill,
        backgroundColor: "brown"
    }

})