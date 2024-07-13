import React, { useState, useEffect} from 'react';
import { View, StyleSheet, Text  } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

type Municipio = {
    id_municipio: string;
    nombre_municipio: string;
    departamento: string;
};

type SelectMunicipioProps = {
    id_departamento: string;
    onMunicipioSelect: (id_municipio: string) => void; // Añade esta línea
  };

const SelectMunicipio: React.FC<SelectMunicipioProps> = ({ id_departamento, onMunicipioSelect }) => {
    const [selectedValue, setSelectedValue] = useState("");
    const [municipios, setMunicipios] = useState<Municipio[]>([]);

    useEffect(() => {
        let url = 'http://ecosistemasesp.unp.gov.co/sicp/api/municipio/';
        if (id_departamento) {
            url += `?departamento=${id_departamento}`;
        }
        fetch(url)
            .then((response) => response.json())
            .then((data) => setMunicipios(data))    
            .catch((error) => console.error(error));
    }, [id_departamento]);


    return (
        <View style={{backgroundColor: '#fff', padding: 5   , borderRadius: 15}}>
            <Text style={styles.LabelStyle}>Municipio</Text>
            <Dropdown
            style={[styles.dropdown, {borderColor: 'black'}]}
            selectedTextStyle={{color:'black', fontSize: 16}}
            placeholder='Seleccione municipio'
            data={municipios.map((item) => ({
                label: item.nombre_municipio,
                value: item.id_municipio
            }))}
            labelField="label"
            valueField="value"
            value={selectedValue}
            onChange={(item) => {
                onMunicipioSelect(item.value);
                setSelectedValue(item.value);
            }}  
            />
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      padding: 10,

    },
    dropdown: {
      height: 40,
      borderColor: 'black',
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
      marginRight: 10,
      marginLeft: 10,

    },
    selectedTextStyle: {
      fontSize: 25,
      color: 'black',
    },
    LabelStyle: {
        fontSize: 16,
        marginBottom: 5,
        fontWeight: '700',
        marginRight: 10,
        marginLeft: 10,
    }

  });

export default SelectMunicipio;
