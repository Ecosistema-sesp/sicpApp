import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import { Container } from "../../inicio/Contenedor";



export type RootStackParamList = {
    IniciarSesion: undefined;
    ResumenVial: {id : number};
    Screen2: undefined;
    Screen3: undefined;
  };

  const NVialForm = () => {
    const [data, setData] = useState<Item[]>([]);
    const [userId, setUserId] = useState(null);
    const [cronosId, setCronosId] = useState(null);
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  
  
    interface Item {
      id_reporte:number;
      fecha_inicio: string;
      usuario_sicp: number;
      ubicacion_inicio: String;
      departamentoinicio: String;
      municipioinicio:String;
      tipo_novedad:String;
    }

    useFocusEffect(
        React.useCallback(() => {
          const fetchData = async () => {
            try {
  
              // obtener el is con la tabla de agente escolta herencia de User
              const username = await AsyncStorage.getItem('username');
              const userResponse = await fetch(`http://ecosistemasesp.unp.gov.co/usuarios/api/usuario/?username=${username}`);
              const userData = await userResponse.json();
              const userId = userData[0].id;
              setUserId(userId);
  
              // obtener cronos a la api correspondiente
      
              const response = await fetch('http://ecosistemasesp.unp.gov.co/sicp/api/vial/');
              const apiData = await response.json();
              const filteredData = apiData
              // filtar con el cronos
                .filter((item: Item) => item.usuario_sicp === userId)
                .sort((a: Item, b: Item) => Number(b.id_reporte) - Number(a.id_reporte));
              setData(filteredData);
            } catch (error) {
              console.error('Error al obtener los datos:', error);
            }
          };
      
          fetchData();
        }, [])
      );

      return (
        <Container>
          {data.map(item => ( 
            <TouchableOpacity key={item.id_reporte}
            onPress={() => {     
                navigation.navigate('ResumenVial', { id: item.id_reporte });
            }}
>
              <View key={item.id_reporte} style={{ 
                position: 'relative',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                backgroundColor: '#F6F6F4',
                padding: 7,
                paddingLeft: 2, 
                borderRadius:7,
                marginBottom: 8, 
              }}>
            <Icon name="car-sport" size={55} color="#5A87C6" style={styles.icono} />
                
    
                <View style={{
                  position: 'absolute',
                  width:'83%',
                  zIndex: 1, 
                  left:65,
                  top:5,
                }}>
    
                  <Text
                    
                    style={{
                      fontSize:13,
                      fontWeight:'700',
                      color: '#5A87C6'
                    }}
                  >
                    REGISTRO: {item.id_reporte}
                  </Text>
                  <Text style={styles.textoizquierda}>
                    DI: {item.departamentoinicio}  
                  </Text>
                  <Text style={styles.textoizquierda}>
                    MI: {item.municipioinicio} 
                  </Text>
                  <Text style={styles.textoizquierda}>
                    UI: {
                      item.ubicacion_inicio
                        ? item.ubicacion_inicio.replace(
                            /SRID=4326;POINT \(([-\d.]+) ([-\d.]+)\)/,
                            (_: any, lon: string, lat: string) => `${parseFloat(lon).toFixed(5)}, ${parseFloat(lat).toFixed(5)} `
                          )
                        : 'No disponible'
                    } 
                    
                  </Text>
                  
                </View>
    
                <View style={{
                  position: 'absolute',
                  width:'25%',
                  alignItems:'flex-end',
                  zIndex: 4,
                  right:6,
                  top:5,
                }}>
                  <Text style={styles.textoderecha}>
                    {new Date(item.fecha_inicio).toISOString().slice(0, 10)}      
                  </Text>
                  <Text style={styles.textoderecha2}>
                    {new Date(item.fecha_inicio).toLocaleTimeString()} 
                  </Text>
                </View>
    
              </View>
            </TouchableOpacity>
          ))}
        </Container>
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
  textoderecha: {
    fontSize: 12, 
  },
  textoderecha2: {
    fontSize: 10, 
  },
  textoizquierda: {
    fontSize: 12,
    fontWeight: '400',
    width:'100%',
    color:'black'
  },
  icono: {
    paddingTop: 3,
    marginRight: 5,
    marginLeft: 0, 
  }
});

export default NVialForm;
