import {useEffect} from 'react';
import { View, Text, StyleSheet, BackHandler} from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import { HeaderButtons} from 'react-navigation-header-buttons';
import { StackNavigationProp } from '@react-navigation/stack';

import { Container } from "../components/inicio/Contenedor";
import BotonFlotante from '../components/novedades/BotonFlotante';
import BtnHeaderScreen from '../components/panel/botonesHeader';
import { DialButtonA } from '../navegacion/botonLineaVida';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DatosUsuario,getUserByUsername,insertarDatosUsuario } from '../../BaseDatos/DatosBasicos';
import NReporteIndividualForm from '../components/novedades/VistaIndividual';
import React from 'react';

const NovedadesStack = createStackNavigator();

const getUsername = async () => {
  try {
    const username = await AsyncStorage.getItem('username');
    return username;
  } catch (error) {
    console.error(error);
  }
};

export type RootStackParamList = {
  IniciarSesion: undefined;
  NovedadDesplazamiento: { desdePanelNovedades: boolean, id : number };
  novedadServicio : { desdePanelNovedades: boolean, id : number };
  novedadSalud : { desdePanelNovedades: boolean, id : number };
  ResumenDesplazamiento: {id : number};
  ResumenServicio : {id: number};
  ResumenSalud : {id: number};
  Screen2: undefined;
  Screen3: undefined;
};

const Novedades = () => {
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

  useEffect(() => {
    DatosUsuario();
    const fetchAndStoreUser = async () => {
      const username = await getUsername();
      if (username !== null) {
        const existingUser = await getUserByUsername(username);
        if (existingUser === null) {
          try {
            const response = await fetch(`http://ecosistemasesp.unp.gov.co/usuarios/api/usuario/?username=${username}`);
            const data = await response.json();
            insertarDatosUsuario(data[0]);
          } catch (error) {
            console.error(error);
          }
        }
      }
    };
    fetchAndStoreUser();
  }, []);

type NavigationProp = StackNavigationProp<RootStackParamList>;

  return (
    <Container floatingButton={<BotonFlotante />} dialButton={<DialButtonA />} >
      <NReporteIndividualForm/>
    </Container>
  );
};

function NovedadesStackScreen() {
  return (
    <NovedadesStack.Navigator>
      <NovedadesStack.Screen 
        name="NovedadesScreen" 
        component={Novedades} 
        options={{ 
          headerLeft: () => null,
          headerRight: () => (
          <HeaderButtons>
            <BtnHeaderScreen menuOptions={[
              // { value: 'option1', text: 'Opción 1 para Novedades', action: (navigation: NavigationProp) => navigation.navigate('IniciarSesion') },
              // { value: 'option2', text: 'Opción 2 para Novedades', action: (navigation: NavigationProp) => navigation.navigate('Screen2') },
              // { value: 'option3', text: 'Opción 3 para Novedades', action: (navigation: NavigationProp) => navigation.navigate('Screen3') },
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
    </NovedadesStack.Navigator>
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

export default NovedadesStackScreen;