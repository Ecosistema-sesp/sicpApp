import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface NovedadCategoriaVialProps {
  vial: any; 
}

interface Novedad {
  id_tnvial: number;  
  nombre_tnvial: String;
}

const NovedadCategoriaVial = ({ vial }: NovedadCategoriaVialProps) => {
    const [novedadVial, setNovedadVial] = useState<Novedad[]>([]);

  useEffect(() => {
    fetchNovedadVial();
  }, []);

  const fetchNovedadVial = async () => {
    try {
      const response = await fetch('http://ecosistemasesp.unp.gov.co/sicp/api/novedadvial/');
      const data = await response.json();
      setNovedadVial([{ id_tnvial: 0, nombre_tnvial: 'Seleccione' }, ...data]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (novedadVial.length > 0 && !vial.values[`tipo_novedad`]) {
      vial.setFieldValue(`tipo_novedad`, novedadVial[0].id_tnvial);
    }
  }, [novedadVial]);
  

  return (
    <View style={styles.departamentomunicipio}>
      <Text style={styles.texto}>
        Novedad:
      </Text>
      <Picker
        style={{...styles.picker, borderWidth: 1, borderColor: 'black', }}
        selectedValue={vial.values[`tipo_novedad`]}
        onValueChange={(itemValue) => {
          vial.setFieldValue(`tipo_novedad`, itemValue);
        }}
      >
      {novedadVial.map((novedad) => (
        <Picker.Item key={novedad.id_tnvial} label={novedad.nombre_tnvial.toString()} value={novedad.id_tnvial} />
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

export default NovedadCategoriaVial;
