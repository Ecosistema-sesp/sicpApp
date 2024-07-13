import React, { useEffect } from 'react';
import { View, Text, StyleSheet, BackHandler} from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import { HeaderButtons} from'react-navigation-header-buttons';
import { StackNavigationProp } from '@react-navigation/stack';

import { Container } from "../components/inicio/Contenedor";
import BtnHeaderScreen from '../components/panel/botonesHeader';
import NPasajeroForm from '../components/novedades/pasajero/VistaPasajero';
import NVehiculoForm from '../components/novedades/vehiculo/VistaVehiculo';
import { DialButtonA, DialButtonB } from '../navegacion/botonLineaVida';
import NComisionForm from '../components/novedades/iniciocomision/VistaComision';
import BotonFlotante from '../components/novedades/BotonFlotante';
import BotonFlotante2 from '../components/novedades/BotonFlotante2';

export type RootStackParamList = {
  IniciarSesion: undefined;
  NovedadPasajero: { desdePanelEsquema: boolean, id : number };
  ResumenPasajero: {id : number};
  novedadInicioMision: {desdePanelEsquema: boolean, id : number}
  ResumenComision:{id : number};
  Screen2: undefined;
  Screen3: undefined;
};
type NavigationProp = StackNavigationProp<RootStackParamList>;
const EsquemaStack = createStackNavigator();

const Esquema = () => {
  useEffect(() => {
    const backAction = () => {
      BackHandler.exitApp();
      return true;
    };
  
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove(); 
  }, []);

  return (
    <Container floatingButton={<BotonFlotante2 />} dialButton={< DialButtonA />}>
      <NComisionForm />
      <NPasajeroForm />
      <NVehiculoForm />
    </Container>
  );
};

function EsquemaStackScreen() {
  return (
    <EsquemaStack.Navigator>
      <EsquemaStack.Screen 
        name="EsquemaScreen" 
        component={Esquema} 
        options={{ 
          headerLeft: () => null,
          headerRight: () => (
          <HeaderButtons>
            <BtnHeaderScreen menuOptions={[
              { value: 'option1', text: 'Opción 1 para Esquema', action: (navigation: NavigationProp) => navigation.navigate('IniciarSesion') },
              { value: 'option2', text: 'Opción 2 para Esquema', action: (navigation: NavigationProp) => navigation.navigate('Screen2') },
              { value: 'option3', text: 'Opción 3 para Esquema', action: (navigation: NavigationProp) => navigation.navigate('Screen3') },
            ]} />
          </HeaderButtons>
          ),
          headerStyle: {
            backgroundColor: '#FFF',
            borderBottomWidth: 1,
            borderBottomColor: '#E6E5E3',
          },
          headerTitle: () => (
            <View>
              <Text style={styles.tituloDirectorio}>SICP - SESP</Text>
            </View>
          ),
        }}
      />
    </EsquemaStack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  tituloDirectorio: {
    fontSize: 20,
    textAlign: 'left',
    fontWeight: '500',
    marginBottom: 5,
    color: '#02467E'
  }
});

export default EsquemaStackScreen;