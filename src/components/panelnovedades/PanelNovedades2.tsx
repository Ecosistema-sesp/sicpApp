import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import BotonPasajero from "./BotonPasajero";
import BotonInicioMision from "./BotonInicioMision";
import BotonVehiculo from "./BotonVehiculo";
import BotonFlotante from "./BotonFlotantePanel";
import BotonVial from "./BotonVial";
import BotonApoyo from "./BotonApoyo";
import BotonEtcr from "./BotonEtcr";


const PanelNovedades2Stack = createStackNavigator();

const PanelNovedades2 = () => {
    return (

        <View style={styles.container}>
            <View style={styles.row}>
                <BotonVehiculo />
                <BotonPasajero />
            </View>
            <View style={styles.row}>
                <BotonInicioMision />
                <BotonVial />
            </View>
            <View style={styles.row}>
                <BotonApoyo />
                <BotonEtcr />                
            </View>
            <BotonFlotante />
        </View>
    )
}

function PanelNovedades2StackScreen() {
  return (
    <PanelNovedades2Stack.Navigator>
      <PanelNovedades2Stack.Screen 
        name="NovedadesScreen" 
        component={PanelNovedades2} 
        options={{ 
          headerLeft: () => null,
          headerRight: () => null,
          headerStyle: {
            backgroundColor: '#FFF',
            borderBottomWidth: 1,
            borderBottomColor: '#E6E5E3',
            height: 80
          },
          headerTitle: () => (
            <View>
              <Text style={styles.titulo}>Reportes</Text>
            </View>
          ),
          headerTitleAlign: 'center',
        }}
      />
    </PanelNovedades2Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 5,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E6E5E3',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 10,
    padding:20,
  },
  icon: {
    marginRight: 10,
  },
  titulo: {
    fontSize: 22,
    fontWeight: '700',
    color: '#245C97'
  }
});


export default PanelNovedades2StackScreen;
