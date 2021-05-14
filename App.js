import React, { useState } from 'react'
import { StyleSheet, View, StatusBar, Text } from 'react-native'
import moment from 'moment'
import 'moment/locale/es'

// components
import MonthView from './src/components/MonthView'
import ShiftManager from './src/components/ShiftManager'
import MyComponent from './src/components/MyComponent'
import ShiftProvider from './src/context/Shift/ShiftProvider'

// styles
import { Provider as PaperProvider, DefaultTheme, BottomNavigation, DarkTheme } from 'react-native-paper'

const CalendarRoute = () => <MonthView></MonthView>
const ShiftsRoute = () => <ShiftProvider><ShiftManager></ShiftManager></ShiftProvider>
const TempRoute = () => <MyComponent></MyComponent>

export default function App() {

  moment.locale('es')

  // BottomNavigation
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'calendar', title: 'Calendario', icon: 'calendar' },
    { key: 'shifts', title: 'Turnos', icon: 'hours-24' },
    { key: 'temp', title: 'Temp', icon: 'history' },
  ])
  const renderScene = BottomNavigation.SceneMap({
    calendar: CalendarRoute,
    shifts: ShiftsRoute,
    temp: TempRoute,
  })

  //<StatusBar hidden />
  return (
    <PaperProvider theme={theme}>
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
        shifting
      />
    </PaperProvider>
  )
}

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "indigo"
  },
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "red"
  }
})


