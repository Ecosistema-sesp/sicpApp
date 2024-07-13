import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

type Departamento = {
    id_departamento: any;
    nombre_departamento: any;
};

type SelectDepartamentoProps = {
    onDepartamentoSelect: (id_departamento: string) => void;
};

const SelectDepartamento: React.FC<SelectDepartamentoProps> = ({ onDepartamentoSelect }) => {
    const [selectedValue, setSelectedValue] = useState("");
    const [departamentos, setDepartamentos] = useState<Departamento[]>([]);

    useEffect(() => {
        fetch('http://ecosistemasesp.unp.gov.co/sicp/api/departamento/')
            .then((response) => response.json())    
            .then((data) => setDepartamentos(data))
            .catch((error) => console.error(error));
    }, []);

    const handleValueChange = (itemValue: any) => {
        setSelectedValue(itemValue);
        onDepartamentoSelect(itemValue);
    };
    

    return (
        <View style={{backgroundColor: '#fff', padding: 5, borderRadius: 15}}> 
    <Text style={styles.LabelStyle}>Departamento</Text>
        <Dropdown
          style={[styles.dropdown, {borderColor: 'black'}]}
          selectedTextStyle={{color:'black', fontSize: 16}}
          placeholder='Seleccione departamento'
          data={departamentos.map((item) => ({
              label: item.nombre_departamento,
              value: item.id_departamento
          }))}
          labelField="label"
          valueField="value"
          value={selectedValue}
          onChange={(item) => handleValueChange(item.value)}
        />
      </View>
    );
};

  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      padding: 5,

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


export default SelectDepartamento;
