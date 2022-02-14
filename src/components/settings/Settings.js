import React from 'react'
import { StyleSheet, View } from 'react-native'

// styles
import { List, Appbar } from 'react-native-paper'

export default function Settings({ navigation }) {

  return (
    <View style={styles.container}>

      <Appbar.Header style={styles.currentDate}>
        <Appbar.Content title="Ajustes" />
      </Appbar.Header>

      <List.Item
        title="Turnos"
        description="Agrega, edita o elimina turnos"
        left={props => <List.Icon {...props} icon="hours-24" />}
        onPress={() => navigation.navigate("ShiftManager")}
      />

    </View>
  )
}

const styles = StyleSheet.create({
  container: {

  }
})