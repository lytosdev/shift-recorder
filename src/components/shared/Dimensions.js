import { Dimensions as dimensions, StatusBar, useWindowDimensions } from 'react-native'
import { useHeaderHeight } from '@react-navigation/stack'

export default function Dimensions() {

    const screenHeight = dimensions.get('screen').height + StatusBar.currentHeight
    const screenHeight2 = useWindowDimensions().height + StatusBar.currentHeight
    const windowHeight = dimensions.get('window').height // no sé qué es

    const APPBAR_HEIGHT = 88 // cambia dependiendo de la pantalla
    const BOTTOMBAR_HEIGHT = 53.8181762695313 // cambia dependiendo de la pantalla

    const heightWithBars = screenHeight - APPBAR_HEIGHT - BOTTOMBAR_HEIGHT
    const screenWidth = dimensions.get('window').width

    return (
        {
            heightWithBars,
            screenWidth
        }
    )
}