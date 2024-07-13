import React, { useState, useEffect } from "react";
import { PermissionsAndroid, TouchableOpacity, Text, BackHandler } from "react-native";
import { View, StyleSheet } from "react-native";
import MapView, { Marker } from 'react-native-maps';
import { createStackNavigator } from "@react-navigation/stack";
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import Geolocation from '@react-native-community/geolocation';
import Icon from 'react-native-vector-icons/Ionicons';
import { ContainerWithoutScroll } from "../components/inicio/Contenedor";

import BtnHeaderScreen from '../components/panel/botonesHeader';

const RutasStack = createStackNavigator();


const Rutas = () => {
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
      
    const [location, setLocation] = useState({ latitude: 4.447, longitude: -72.949, latitudeDelta: 10, longitudeDelta: 10 });

    const requestLocationPermission = async () => {
        try {
            const granted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
            if (granted) {
                console.log("Ya tienes acceso a la localización");
                return true;
            }
            const userResponse = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: "Permiso de localización",
                    message: "Tu aplicación necesita acceso a la localización",
                    buttonNeutral: "Preguntar luego",
                    buttonNegative: "Cancelar",
                    buttonPositive: "OK"
                }
            );
            if (userResponse === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("Tienes acceso a la localización");
                return true;
            } else {
                console.log("Permiso de localización denegado");
                return false;
            }
        } catch (err) {
            console.warn(err);
            return false;
        }
    };
    
    const captureCurrentPosition = async () => {
        const hasLocationPermission = await requestLocationPermission();
        if (!hasLocationPermission) return;
    
        try {
            Geolocation.getCurrentPosition(
                position => {
                    const { latitude, longitude } = position.coords;
                    setLocation({ latitude, longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 });
                },
                error => console.log(error),
                { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
            );
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <ContainerWithoutScroll>
            <MapView
                style={styles.map}
                region={location}
            >
                <Marker coordinate={location} />
            </MapView>
            <TouchableOpacity
                style={styles.botonflotante}
                onPress={captureCurrentPosition}
            >
                <Icon name="locate-sharp" size={30} color="#FFF" />
            </TouchableOpacity>
        </ContainerWithoutScroll>
    )
}

function RutasStackScreen() {
    return (
      <RutasStack.Navigator>
        <RutasStack.Screen 
          name="RutasScreen" 
          component={Rutas} 
          options={{ 
            headerLeft: () => null,
            headerRight: () => (
            <HeaderButtons>
                <BtnHeaderScreen menuOptions={[
                  { value: 'option1', text: 'Opción 1 para Rutas' },
                  { value: 'option2', text: 'Opción 2 para Rutas' },
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
                <Text style={styles.tituloRutas}>Rutas</Text>
              </View>
            ),
          }}
        />
      </RutasStack.Navigator>
    );
  }

const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    botonflotante: {
        backgroundColor: '#5A87C6',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 15,
        right: 15,
    },
    textoBoton: {
        color: '#FFF',
        fontSize: 10,
    },
    tituloRutas: {
        fontSize: 20,
        textAlign: 'left',
        fontWeight: '500',
        marginBottom: 5,
        color: '#02467E'
      }
});

export default RutasStackScreen
