import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, PermissionsAndroid, Platform, Text } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

interface UbicacionProps {
  desplazamiento: any; 
  tipo: any; 
}

type Location = {
  latitude: number;
  longitude: number;
};


const Ubicacion = ({ desplazamiento, tipo }: UbicacionProps) => {
  const [location, setLocation] = useState<string | Location | null>(null);
  

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Permiso de ubicación',
            message: 'Esta aplicación necesita acceder a tu ubicación',
            buttonNeutral: 'Pregúntame luego',
            buttonNegative: 'Cancelar',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Tienes permiso para acceder a la ubicación');
        } else {
          console.error('Permiso de ubicación denegado');
        }
      }
      Geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          desplazamiento.setFieldValue(`ubicacion_${tipo}`, `SRID=4326;POINT (${longitude} ${latitude})`);
        },
        error => console.error(error),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
      );      
    };

    requestLocationPermission();
  }, []);

  return (
    <View style={styles.ubicacion}>
      <Text style={styles.texto}>
        Ubicación:
      </Text>
      <TextInput
        style={styles.input}
        placeholder={`Ubicación de ${tipo}`}
        value={
          typeof location === 'string'
            ? location
            : location
            ? `${location.latitude}, ${location.longitude}`
            : ''
        }
        editable={false}
        onFocus={() => {
          setLocation(''); 
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  ubicacion: {
    paddingTop: 5,
    paddingBottom: 0,
  },
  texto: {
    color: '#00447C',
    marginBottom: 5,
    fontWeight: '500',
    fontSize: 16,
  },
  input: {
    height: 48,
    fontSize: 17,
    color: '#5A87C6',
    fontWeight: '400',
    borderColor: '#CED4DA',
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 7,
    paddingLeft: 15,
  },
});

export default Ubicacion;
