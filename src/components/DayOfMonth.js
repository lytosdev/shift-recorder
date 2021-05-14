import React from 'react'
import { StyleSheet } from 'react-native'

// styles
import { Surface, Caption } from 'react-native-paper'

const DayOfMonth = (props) => {

    return (
        <Surface style={[styles.surface, props.style]}>
            <Caption style={styles.head}>{props.children}</Caption>
        </Surface>
    )
}

const styles = StyleSheet.create({
    surface: {
        padding: 5,
        elevation: 1
    },
    head: {

    }
})

const propsText = {
    numberOfLines: 1,
    ellipsizeMode: "tail"
}

export default DayOfMonth;