import React, { useState } from 'react'
import { StyleSheet, View, StatusBar, Text } from 'react-native'
import moment from 'moment'
import 'moment/locale/es'

// components
// today
import Today from '@components/today/Today'
// month
import Month from '@components/month/Month'
import EditDay from '@components/month/EditDay'
// balance
import Balance from '@components/balance/Balance'
// settings
import Settings from '@components/settings/Settings'
import ShiftManager from '@components/settings/ShiftManager'
// others
import Splash from '@components/Splash'

// providers
import OnStartProvider from '@context/onStart/OnStartProvider'
import ShiftProvider from '@context/shift/ShiftProvider'
import DayProvider from '@context/day/DayProvider'
import MonthProvider from '@context/month/MonthProvider'

// styles
import { Provider as PaperProvider, DefaultTheme as PaperDefaultTheme } from 'react-native-paper'
import { NavigationContainer, DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native'
import MaterialCommunityIcons from '@expo/vector-icons'
import Icon from '@expo/vector-icons/Ionicons'

// navigation
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createStackNavigator } from '@react-navigation/stack'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'


export default function App() {

    moment.locale('es')

    return (
        <OnStartProvider>
            <MonthProvider>
                <DayProvider>
                    <ShiftProvider>
                        <PaperProvider theme={theme}>
                            <NavigationContainer theme={theme}>
                                <Stack.Navigator initialRouteName="Splash">
                                    <Stack.Screen
                                        name="Splash"
                                        component={Splash}
                                        options={
                                            {
                                                headerShown: false
                                            }
                                        }
                                    />
                                    <Stack.Screen
                                        name="Home"
                                        component={createMaterialBottomTabs}
                                        options={
                                            {
                                                headerShown: false
                                            }
                                        }
                                    />
                                    <Stack.Screen
                                        name="ShiftManager"
                                        component={ShiftManager}
                                        options={
                                            {
                                                headerTitle: "Turnos"
                                            }
                                        }
                                    />
                                    <Stack.Screen
                                        name="EditDay"
                                        component={EditDay}
                                        options={
                                            {

                                            }
                                        }
                                    />
                                </Stack.Navigator>
                            </NavigationContainer >
                        </PaperProvider>
                    </ShiftProvider>
                </DayProvider>
            </MonthProvider>
        </OnStartProvider>
    )
}

const Stack = createStackNavigator()
const MaterialBottomTabs = createMaterialBottomTabNavigator()

const createMaterialBottomTabs = () =>
    <MaterialBottomTabs.Navigator shifting={false}>
        <MaterialBottomTabs.Screen
            name="Today"
            component={Today}
            options={
                {
                    tabBarIcon: "calendar-today",
                    tabBarLabel: "Hoy"
                }
            }
        />
        <MaterialBottomTabs.Screen
            name="Month"
            component={Month}
            options={
                {
                    tabBarIcon: "calendar",
                    tabBarLabel: "Mes"
                }
            }
        />
        <MaterialBottomTabs.Screen
            name="Balance"
            component={Balance}
            options={
                {
                    tabBarIcon: "cash-register",
                    tabBarLabel: "Balance"
                }
            }
        />
        <MaterialBottomTabs.Screen
            name="Settings"
            component={Settings}
            options={
                {
                    tabBarIcon: "cog",
                    tabBarLabel: "Ajustes"
                }
            }
        />
        <MaterialBottomTabs.Screen
            name="Tests"
            component={View}
            options={
                {
                    tabBarIcon: "clock",
                    tabBarLabel: "Tests"
                }
            }
        />
    </MaterialBottomTabs.Navigator>

const theme = {
    ...PaperDefaultTheme,
    ...NavigationDefaultTheme,
    colors: {
        ...PaperDefaultTheme.colors,
        ...NavigationDefaultTheme.colors,
        primary: "indigo",
        accent: "red"
    },
}

const styles = StyleSheet.create({

    main: {

    }

})