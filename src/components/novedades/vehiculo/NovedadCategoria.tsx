import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface NovedadCategoriaProps {
  vehiculo: any; 
}

interface Novedad {
  id_tnvehiculo: number;
  id_ctnvehiculo: number;
  nombre_tnvehiculo: String;
  nombre_ctnvehiculo : String;
}

const NovedadCategoria = ({ vehiculo }: NovedadCategoriaProps) => {
    const [novedad, setNovedad] = useState<Novedad[]>([]);
    const [categoria, setCategoria] = useState<Novedad[]>([]);

  useEffect(() => {
    fetchNovedad();
  }, []);

  const fetchNovedad = async () => {
    try {
      const response = await fetch('http://ecosistemasesp.unp.gov.co/sicp/api/novedadvehiculo/');
      const data = await response.json();
      setNovedad([{ id_tnvehiculo: 0, nombre_tnvehiculo: 'Seleccione' }, ...data]);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCategoria = async (id_tnvehiculo: Number) => {
    try {
      const response = await fetch(`http://ecosistemasesp.unp.gov.co/sicp/api/categoriavehiculo/?tipo_nvehiculo=${id_tnvehiculo}`);
      const data = await response.json();
      setCategoria([{ id_ctnvehiculo: 0, nombre_ctnvehiculo: 'Seleccione' }, ...data]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (novedad.length > 0 && !vehiculo.values[`tipo_novedad`]) {
      vehiculo.setFieldValue(`tipo_novedad`, novedad[0].id_tnvehiculo);
      fetchCategoria(novedad[0].id_tnvehiculo);
    }
  }, [novedad]);
  
  useEffect(() => {
    if (categoria.length > 0 && !vehiculo.values[`caracteristica_novedad`]) {
      vehiculo.setFieldValue(`caracteristica_novedad`, categoria[0].id_ctnvehiculo);
    }
  }, [categoria]);

  return (
    <View style={styles.departamentomunicipio}>
      <Text style={styles.texto}>
        Novedad:
      </Text>
      <Picker
        style={{...styles.picker, borderWidth: 1, borderColor: 'black', }}
        selectedValue={vehiculo.values[`tipo_novedad`]}
        onValueChange={(itemValue) => {
          vehiculo.setFieldValue(`tipo_novedad`, itemValue);
          if (itemValue !== 0) {
            fetchCategoria(itemValue);
          }
        }}
      >
      {novedad.map((novedad) => (
        <Picker.Item key={novedad.id_tnvehiculo} label={novedad.nombre_tnvehiculo.toString()} value={novedad.id_tnvehiculo} />
      ))}
      </Picker>
      <Text style={styles.texto}>
        Categoria:
      </Text>
      <Picker
        style={styles.picker}
        selectedValue={vehiculo && vehiculo.values ? vehiculo.values[`caracteristica_novedad`] : ''}
        onValueChange={(itemValue) => {
          if (vehiculo && vehiculo.setFieldValue) {
            vehiculo.setFieldValue(`caracteristica_novedad`, itemValue);
          }
        }}
      >
        {categoria.map((categoria) => (
          <Picker.Item key={categoria.id_ctnvehiculo} label={categoria.nombre_ctnvehiculo.toString()} value={categoria.id_ctnvehiculo} />
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

export default NovedadCategoria;
