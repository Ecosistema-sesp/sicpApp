import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import BotonDesplazamiento from "./BotonDesplazamiento";
import BotonPasajero from "./BotonPasajero";
import BotonInicioMision from "./BotonInicioMision";
import BotonVehiculo from "./BotonVehiculo";
import BotonFlotante from "./BotonFlotantePanel";
import BotonServicio from "./BotonServicio";
import { BotonSubmit } from "../../navegacion/BotonSubmit";
import BotonVial from "./BotonVial";
import BotonSalud from "./BotonSalud";
import BotonDotacion from "./BotonDotacion";
import BotonDisponibilidad from "./BotonDisponibilidad";
import BotonFinalizacion from "./BotonFinalizacionAnticipada";
import BotonInasistencia from "./BotonInasistencia";
import BotonViaticos from "./BotonViaticos";
import BotonOtro from "./BotonOtroReporteIndividual";
import { ScrollView } from "react-native-gesture-handler";


const PanelNovedadesStack = createStackNavigator();

const PanelNovedades = () => {
    return (
      <ScrollView>
        <View style={styles.container}>
            <View style={styles.row}>
                <BotonDesplazamiento />
                <BotonServicio />
            </View>
            <View style={styles.row}>
                <BotonSalud />
                <BotonDotacion />
            </View>
            <View style={styles.row}>
                <BotonDisponibilidad />
                <BotonFinalizacion />
            </View>
            <View style={styles.row}>
              <BotonInasistencia />
              <BotonViaticos />
            </View>
            <View style={styles.row}>
            <BotonOtro />
            </View>
            <BotonFlotante />
        </View>
      </ScrollView>
    )
}

function PanelNovedadesStackScreen() {
  return (
    <PanelNovedadesStack.Navigator>
      <PanelNovedadesStack.Screen 
        name="NovedadesScreen" 
        component={PanelNovedades} 
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
    </PanelNovedadesStack.Navigator>
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


export default PanelNovedadesStackScreen;
