import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'

// components
import ListItemShift from './ListItemShift'

// styles
import { Button } from 'react-native-paper'


export default function ListItemChop({ shift, inPressed, outPressed, style }) {


    return (
        <View style={style}>
            <ListItemShift shift={shift} />
            <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
                <Button
                    mode="outlined"
                    onPress={inPressed}
                >
                    {
                        shift.inTimeReal === "" ?
                            "Entrada"
                            :
                            `Entrada ${shift.inTimeReal}`
                    }
                </Button>
                <Button
                    mode="outlined"
                    onPress={outPressed}
                >
                    {
                        shift.outTimeReal === "" ?
                            "Salida"
                            :
                            `Salida ${shift.outTimeReal}`
                    }
                </Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {

    }
})

ListItemChop.propTypes = {
    shift: PropTypes.shape({
        name: PropTypes.string.isRequired,
        inTime: PropTypes.string.isRequired,
        outTime: PropTypes.string.isRequired,
        wholeDay: PropTypes.bool.isRequired,
        color: PropTypes.string.isRequired,
        inTimeReal: PropTypes.string.isRequired,
        outTimeReal: PropTypes.string.isRequired
    }),
    inPressed: PropTypes.func,
    outPressed: PropTypes.func
}
