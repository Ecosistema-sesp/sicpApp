import React, { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import axios from 'axios';
import { Linking } from 'react-native';


interface Contacto {
    id_dtelefonico : number;
    primer_ncontacto: string;
    segundo_ncontacto: string | null;
    primer_acontacto: string;
    segundo_acontacto: string | null;
    grupotrabajo: string;
    correoInstitucional: string | null;
    contacto: string;
  }

const DirectorioForm = () => {
  const [data, setData] = useState<Contacto[]>([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios('http://ecosistemasesp.unp.gov.co/sicp/api/directorio/');
      const sortedData = result.data.sort((a: Contacto, b: Contacto) => a.id_dtelefonico - b.id_dtelefonico);
      setData(sortedData);
    };
  
    fetchData();
  }, []);

    const handlePress = (contacto: string) => {
      Linking.openURL(`tel:${contacto}`);
    };

    function formatText(item:any) {
      let texto = '';
      if (item.primer_ncontacto) {
        texto += item.primer_ncontacto;
      }
      if (item.segundo_ncontacto) {
        texto += ' ' + item.segundo_ncontacto;
      }
      if (item.primer_acontacto) {
        texto += ' ' + item.primer_acontacto;
      }
      if (item.segundo_acontacto) {
        texto += ' ' + item.segundo_acontacto;
      }
      return texto.trim(); 
    }
  return (
    <FlatList
      data={data}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }: { item: Contacto }) => (
        <TouchableOpacity onPress={() => handlePress(item.contacto)}>
            <View style={styles.view}>
                <Text style={styles.texto}>{formatText(item)}</Text>                
                <Text style={styles.texto1}> {item.grupotrabajo}</Text>
                <Text style={styles.texto1}> Correo Institucional: {item.correoInstitucional}</Text>
                <Text style={styles.texto1}> Celular: {item.contacto}</Text>
            </View>
        </TouchableOpacity> 
      )}
    />
  );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    textonovedades: {
      flexWrap: 'wrap',
      textAlign: 'justify',
      paddingTop: 20
    },
    texto: {
        fontSize: 20,
        textAlign: 'left',
        fontWeight: '500',
        color: '#02467E'
    },

    texto1:{
        fontSize :12
    },

    icono: {
      paddingTop: 3,
      marginRight: 5,
      marginLeft: 0, 
    },

    view:{
        position: 'relative',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: '#F6F6F4',
        padding: 7,
        paddingLeft: 2, 
        borderRadius:7,
        marginBottom: 8, 
    }
  });
  
export default DirectorioForm;
