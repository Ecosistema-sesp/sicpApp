import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { getDepartamentos, getMunicipio } from '../../../BaseDatos/DepartamentoMunicipio';

interface DepartamentoMunicipioProps {
  desplazamiento: any; 
  tipo: any; 
}

interface Departamento {
  id_departamento: number;
  id_municipio: number;
  nombre_departamento: String;
  nombre_municipio : String;
}

const DepartamentoMunicipio = ({ desplazamiento, tipo }: DepartamentoMunicipioProps) => {
  const [departamentos, setDepartamentos] = useState<Departamento[]>([]);
  const [municipios, setMunicipios] = useState<Departamento[]>([]);
  const [selectedDepartamento, setSelectedDepartamento] = useState<number | null>(null);

  useEffect(() => {
    getDepartamentos()
      .then((data:any)=>{
        if (data.length > 0) {
          setDepartamentos(data);
        } else {
          fetchDepartamentos();
        }
      })
    }, []);
  
  useEffect(() => {
    if (departamentos.length > 0) {
      setSelectedDepartamento(departamentos[0].id_departamento);
    }
  }, [departamentos]);

  const fetchDepartamentos = async () => {
    try {
      const response = await fetch('http://ecosistemasesp.unp.gov.co/sicp/api/departamento/');
      const data = await response.json();
      setDepartamentos(data);
      setSelectedDepartamento(data[0].id_departamento);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (selectedDepartamento !== null) {
      getMunicipio(selectedDepartamento)
        .then((data:any) => {
          if (data.length > 0) {
            setMunicipios(data);
          } else {
            fetchMunicipios(selectedDepartamento);
          }
        })
        .catch(error => console.error(error));
    }
  }, [selectedDepartamento]);

  const fetchMunicipios = async (id_departamento: Number) => {
    try {
      const response = await fetch(`http://ecosistemasesp.unp.gov.co/sicp/api/municipio/?departamento=${id_departamento}`);
      const data = await response.json();
      setMunicipios(data);
    } catch (error) {
      console.error(error);
    }
  };

  
  useEffect(() => {
    if (departamentos.length > 0) {
      desplazamiento.setFieldValue(`departamento_${tipo}`, departamentos[0].id_departamento);
      fetchMunicipios(departamentos[0].id_departamento);
    }
  }, [departamentos]);

  useEffect(() => {
    if (municipios.length > 0) {
      if (desplazamiento.values[`municipio_${tipo}`] !== undefined) {
        desplazamiento.setFieldValue(`municipio_${tipo}`, municipios[0].id_municipio);
      } else if (desplazamiento.values[`munipio_${tipo}`] !== undefined) {
        desplazamiento.setFieldValue(`munipio_${tipo}`, municipios[0].id_municipio);
      }
    }
  }, [municipios]);
  

  return (

    <View style={styles.departamentomunicipio}>

      <Text style={styles.texto}>
        Departamento:
      </Text>

      <View style={styles.viewPicker}>
        <Picker
          style={{...styles.picker}}
          itemStyle={styles.pickerItem}
          selectedValue={desplazamiento.values[`departamento_${tipo}`]}
          onValueChange={(itemValue) => {
            desplazamiento.setFieldValue(`departamento_${tipo}`, itemValue);
            setSelectedDepartamento(itemValue);  // Añade esta línea
            fetchMunicipios(itemValue);
          }}
        >
        {departamentos.map((departamento) => (
          <Picker.Item key={departamento.id_departamento} label={departamento.nombre_departamento.toString()} value={departamento.id_departamento} />
        ))}
        </Picker>
      </View>

      <Text style={styles.texto}>
        Municipio:
      </Text>

      <View style={styles.viewPicker}>
        <Picker
          style={styles.picker}
          selectedValue={desplazamiento && desplazamiento.values ? (desplazamiento.values[`municipio_${tipo}`] || desplazamiento.values[`munipio_${tipo}`]) : ''}
          onValueChange={(itemValue) => {
            if (desplazamiento && desplazamiento.setFieldValue) {
              if (desplazamiento.values[`municipio_${tipo}`] !== undefined) {
                desplazamiento.setFieldValue(`municipio_${tipo}`, itemValue);
              } else if (desplazamiento.values[`munipio_${tipo}`] !== undefined) {
                desplazamiento.setFieldValue(`munipio_${tipo}`, itemValue);
              }
            }
          }}
        >
          {municipios.map((municipio) => (
            <Picker.Item key={municipio.id_municipio} label={municipio.nombre_municipio.toString()} value={municipio.id_municipio} />
          ))}
        </Picker>

      </View>

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
    paddingLeft: 2,
    fontSize: 16,
  },

  picker: {
    height: 48,
    fontSize: 17,
    color: '#5A87C6',
    fontWeight: '500',
    borderColor: '#CED4DA',
    borderWidth: 1,
    marginBottom: 10,
    marginLeft: 0,
    paddingLeft: 0,
  },

  viewPicker: {
    height: 55,
    fontSize: 17,
    color: '#5A87C6',
    fontWeight: '400',
    borderColor: '#CED4DA',
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 7,
    paddingLeft: 0,
  },

});

export default DepartamentoMunicipio;