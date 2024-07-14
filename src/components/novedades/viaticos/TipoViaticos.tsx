import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface NovedadCategoriaViaticosProps {
  Viaticos: any; 
}

interface Novedad {
  id_tviaticos: number;  
  nombre_tviaticos: String;
}

const NovedadCategoriaViaticos = ({ Viaticos }: NovedadCategoriaViaticosProps) => {
    const [novedadViaticos, setNovedadViaticos] = useState<Novedad[]>([]);

  useEffect(() => {
    fetchNovedadViaticos();
  }, []);

  const fetchNovedadViaticos = async () => {
    try {
      const response = await fetch('http://ecosistemasesp.unp.gov.co/sicp/api/novedadviaticos/');
      const data = await response.json();
      setNovedadViaticos([{ id_tviaticos: 0, nombre_tviaticos: 'Seleccione' }, ...data]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (novedadViaticos.length > 0 && !Viaticos.values[`tipo_nviaticos`]) {
      Viaticos.setFieldValue(`tipo_nviaticos`, novedadViaticos[0].id_tviaticos);
    }
  }, [novedadViaticos]);
  

  return (
    <View style={styles.departamentomunicipio}>
      <Text style={styles.texto}>
        Novedad:
      </Text>
      <Picker
        style={{...styles.picker, borderWidth: 1, borderColor: 'black', }}
        selectedValue={Viaticos.values[`tipo_nviaticos`]}
        onValueChange={(itemValue) => {
          Viaticos.setFieldValue(`tipo_nviaticos`, itemValue);
        }}
      >
      {novedadViaticos.map((novedad) => (
        <Picker.Item key={novedad.id_tviaticos} label={novedad.nombre_tviaticos.toString()} value={novedad.id_tviaticos} />
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

export default NovedadCategoriaViaticos;
