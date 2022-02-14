import React, { useContext, cloneElement } from 'react'
import { StyleSheet } from 'react-native'
import ShiftContext from '../../context/shift/ShiftContext'
import PropTypes from 'prop-types'

// styles
import { List, useTheme } from 'react-native-paper'


export default function ListItemShift({ shift, right }) {

    const { colors } = useContext(ShiftContext)
    const getColor = colors.find(e => e.key === shift.color)

    return (
        <List.Item
            title={shift.name}
            description={
                shift.wholeDay ?
                    "Todo el día"
                    :
                    `Entrada ${shift.inTime}h - Salida ${shift.outTime}h`
            }
            left={(props) => <List.Icon {...props} icon="checkbox-blank-circle" color={getColor.value} />}
            right={(props) =>
                right ?
                    right.type === React.Fragment ?
                        <>
                            {
                                right.props.children.map(e => {
                                    return cloneElement(e,
                                        {
                                            ...props,
                                            color: useTheme().colors.primary,
                                            key: right.props.children.indexOf(e)
                                        })
                                })
                            }
                        </>
                        :
                        cloneElement(right, { ...props, color: useTheme().colors.primary })
                    :
                    <></>
            }
        />
    )
}

const styles = StyleSheet.create({
    container: {

    }
})

ListItemShift.propTypes = {
    shift: PropTypes.shape({
        name: PropTypes.string.isRequired,
        inTime: PropTypes.string.isRequired,
        outTime: PropTypes.string.isRequired,
        wholeDay: PropTypes.bool.isRequired,
        color: PropTypes.string.isRequired
    }),
    right: PropTypes.element
}