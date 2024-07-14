import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface NovedadCategoriaDotacionProps {
  Dotacion: any; 
}

interface Novedad {
  id_tdotacion: number;  
  nombre_tdotacion: String;
}

const NovedadCategoriaDotacion = ({ Dotacion }: NovedadCategoriaDotacionProps) => {
    const [novedadDotacion, setNovedadDotacion] = useState<Novedad[]>([]);

  useEffect(() => {
    fetchNovedadDotacion();
  }, []);

  const fetchNovedadDotacion = async () => {
    try {
      const response = await fetch('http://ecosistemasesp.unp.gov.co/sicp/api/novedaddotacion/');
      const data = await response.json();
      setNovedadDotacion([{ id_tdotacion: 0, nombre_tdotacion: 'Seleccione' }, ...data]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (novedadDotacion.length > 0 && !Dotacion.values[`tipo_novedad`]) {
      Dotacion.setFieldValue(`tipo_novedad`, novedadDotacion[0].id_tdotacion);
    }
  }, [novedadDotacion]);
  

  return (
    <View style={styles.departamentomunicipio}>
      <Text style={styles.texto}>
        Novedad:
      </Text>
      <Picker
        style={{...styles.picker, borderWidth: 1, borderColor: 'black', }}
        selectedValue={Dotacion.values[`tipo_novedad`]}
        onValueChange={(itemValue) => {
          Dotacion.setFieldValue(`tipo_novedad`, itemValue);
        }}
      >
      {novedadDotacion.map((novedad) => (
        <Picker.Item key={novedad.id_tdotacion} label={novedad.nombre_tdotacion.toString()} value={novedad.id_tdotacion} />
      ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  departamentomunicipio: {
    paddingTop: 5,
    paddingBottom: 0,
  },
  texto: {
    color: '#00447C',
    marginBottom: 5,
    fontWeight: '500',
    fontSize: 16,
  },
  picker: {
    height: 48,
    fontSize: 17,
    color: '#5A87C6',
    fontWeight: '500',
    borderColor: '#CED4DA',
    backgroundColor:'#F6F6F4',
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 7,
    paddingLeft: 15,
  },
});

export default NovedadCategoriaDotacion;
