import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface NovedadCategoriaInasistenciaProps {
  Inasistencia: any; 
}

interface Novedad {
  id_tinasistencia: number;  
  nombre_tinasistenacia: String;
}

const NovedadCategoriaInasistencia = ({ Inasistencia }: NovedadCategoriaInasistenciaProps) => {
    const [novedadInasistencia, setNovedadInasistencia] = useState<Novedad[]>([]);

  useEffect(() => {
    fetchNovedadInasistencia();
  }, []);

  const fetchNovedadInasistencia = async () => {
    try {
      const response = await fetch('http://ecosistemasesp.unp.gov.co/sicp/api/novedadinasistencia/');
      const data = await response.json();
      setNovedadInasistencia([{ id_tinasistencia: 0, nombre_tinasistenacia: 'Seleccione' }, ...data]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (novedadInasistencia.length > 0 && !Inasistencia.values[`tipo_inasistencia`]) {
      Inasistencia.setFieldValue(`tipo_inasistencia`, novedadInasistencia[0].id_tinasistencia);
    }
  }, [novedadInasistencia]);
  

  return (
    <View style={styles.departamentomunicipio}>
      <Text style={styles.texto}>
        Novedad:
      </Text>
      <Picker
        style={{...styles.picker, borderWidth: 1, borderColor: 'black', }}
        selectedValue={Inasistencia.values[`tipo_inasistencia`]}
        onValueChange={(itemValue) => {
          Inasistencia.setFieldValue(`tipo_inasistencia`, itemValue);
        }}
      >
      {novedadInasistencia.map((novedad) => (
        <Picker.Item key={novedad.id_tinasistencia} label={novedad.nombre_tinasistenacia.toString()} value={novedad.id_tinasistencia} />
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

export default NovedadCategoriaInasistencia;
