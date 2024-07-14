import React from "react";
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import IniciarSesion from './src/screens/Inicio';
import { Panel } from "./src/screens/Panel";
import PanelNovedades from "./src/components/panelnovedades/PanelNovedades";
import DesplazamientoStackScreen from "./src/components/novedades/desplazamiento/Desplazamiento";
import ResumenDesplazamientoStackScreen from "./src/components/novedades/desplazamiento/ResumenDesplazamiento";
import PasajeroStackScreen from "./src/components/novedades/pasajero/Pasajero";
import VehiculoStackScreen from "./src/components/novedades/vehiculo/Vehiculo";
import InicioMisionStackScreen from "./src/components/novedades/iniciocomision/InicioComision";
import ResumenPasajeroStackScreen from "./src/components/novedades/pasajero/ResumenPasajero";
import ResumenVehiculoStackScreen from "./src/components/novedades/vehiculo/ResumenVehiculo";
import ResumenComisionStackScreen from "./src/components/novedades/iniciocomision/ResumenComision";
import InicioServicioStackScreen from "./src/components/novedades/servicio/Servicio";
import ResumenServicioStackScreen from "./src/components/novedades/servicio/ResumenServicio";

import VialStackScreen from "./src/components/novedades/vial/Vial";
import ResumenVialStackScreen from "./src/components/novedades/vial/ResumenVial";
import PanelNovedades2StackScreen from "./src/components/panelnovedades/PanelNovedades2";
import SaludStackScreen from "./src/components/novedades/salud/Salud";
import ResumenSaludStackScreen from "./src/components/novedades/salud/ResumenSalud";
import DotacionStackScreen from "./src/components/novedades/dotación/Dotacion";
import ResumenDotacionStackScreen from "./src/components/novedades/dotación/ResumenDotacion";
import DisponibilidadStackScreen from "./src/components/novedades/disponibilidad/Disponibilidad";
import ResumenDisponibilidadStackScreen from "./src/components/novedades/disponibilidad/ResumenDisponibilidad";
import FinalizacionStackScreen from "./src/components/novedades/finalizacionAnticipada/FinalizacionAnticipada";
import ResumenFinalizacionStackScreen from "./src/components/novedades/finalizacionAnticipada/ResumenFinalizacionAnticipada";

const Stack = createNativeStackNavigator();

function App() {
  return (  

    <NavigationContainer>
        <StatusBar backgroundColor="#FFF" barStyle="dark-content" />
          <Stack.Navigator initialRouteName="IniciarSesion">
            <Stack.Screen name="IniciarSesion" component={IniciarSesion} options={{ headerShown: false }} />
            <Stack.Screen name="Panel" component={Panel} options={{ headerShown: false }} />
            <Stack.Screen name="PanelNovedades" component={PanelNovedades} options={{ headerShown: false }} />
            <Stack.Screen name="PanelNovedades2" component={PanelNovedades2StackScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ResumenDesplazamiento"  component={ResumenDesplazamientoStackScreen} options={{ headerShown: false }} />
            <Stack.Screen name="NovedadDesplazamiento"  component={DesplazamientoStackScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ResumenPasajero"  component={ResumenPasajeroStackScreen} options={{ headerShown: false }} />
            <Stack.Screen name="novedadPasajero"  component={PasajeroStackScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ResumenVehiculo"  component={ResumenVehiculoStackScreen} options={{ headerShown: false }} />
            <Stack.Screen name="novedadVehiculo"  component={VehiculoStackScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ResumenComision"  component={ResumenComisionStackScreen} options={{ headerShown: false }} />
            <Stack.Screen name="novedadInicioMision"  component={InicioMisionStackScreen} options={{ headerShown: false }} />
            <Stack.Screen name="novedadServicio"  component={InicioServicioStackScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ResumenServicio"  component={ResumenServicioStackScreen} options={{ headerShown: false }} />
            <Stack.Screen name="novedadVial" component={VialStackScreen} options={{headerShown:false}} />
            <Stack.Screen name="ResumenVial" component={ResumenVialStackScreen} options={{headerShown:false}} />
            <Stack.Screen name="novedadSalud" component={SaludStackScreen} options={{headerShown:false}} />
            <Stack.Screen name="ResumenSalud" component={ResumenSaludStackScreen} options={{headerShown:false}} />
            <Stack.Screen name="NovedadDotacion" component={DotacionStackScreen} options={{headerShown:false}} />
            <Stack.Screen name="ResumenDotacion" component={ResumenDotacionStackScreen} options={{headerShown:false}} />
            <Stack.Screen name="novedadDisponibilidad" component={DisponibilidadStackScreen} options={{headerShown:false}} />
            <Stack.Screen name="ResumenDisponibilidad" component={ResumenDisponibilidadStackScreen} options={{headerShown:false}} />
            <Stack.Screen name="novedadFinalizacion" component={FinalizacionStackScreen} options={{headerShown:false}} />
            <Stack.Screen name="ResumenFinalizacion" component={ResumenFinalizacionStackScreen} options={{headerShown:false}} />

          </Stack.Navigator>
        </NavigationContainer>
  );
}

export default App;
