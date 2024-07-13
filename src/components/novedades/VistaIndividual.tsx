import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Iconc from 'react-native-vector-icons/MaterialIcons';

import { Container } from "../inicio/Contenedor";
import { useServicio } from './servicio/RutaServicio';
import { desplazamientoUbicacionFin, useDesplazamiento } from './desplazamiento/rutadesplazamiento';
import { useSalud } from './salud/RutaSalud';

export type RootStackParamList = {
  IniciarSesion: undefined;
  NovedadDesplazamiento: { desdePanelNovedades: boolean, id : number };
  ResumenDesplazamiento: {id : number};
  novedadServicio: { desdePanelNovedades: boolean, id : number };
  ResumenServicio: {id : number};
};

const NReporteIndividualForm = () => {
  
  const [data, setData] = useState<Item[]>([]);
  const [userId, setUserId] = useState(null);
  const servicioData = useServicio();
  const desplazamiento = useDesplazamiento();
  const salud = useSalud();
  const UbicacionFin = desplazamientoUbicacionFin();

  interface Item {
    fecha_inicio: string;
    usuario_sicp: number;
    id_reporte : number;
    ubicacion_inicio: String;
    departamentoinicio: String;
    municipioinicio:String;
    ubicacion_fin:String;
    departamentofin:String;
    municipiofin:String;
    tipo_reporte:number;
  }

useFocusEffect(
  React.useCallback(() => {

    const fetchData = async () => {
      try {
        const username = await AsyncStorage.getItem('username');
        console.log(username)
        const userResponse = await fetch(`http://ecosistemasesp.unp.gov.co/usuarios/api/usuario/?username=${username}`);
        const userData = await userResponse.json();
        const userId = userData[0].id;
        setUserId(userId);
    
        const response = await fetch('http://ecosistemasesp.unp.gov.co/sicp/api/reportes/');
        const apiData = await response.json();
        
        const filteredData = apiData
        .filter((item: Item) => item.usuario_sicp === userId && (item.tipo_reporte === 2 || item.tipo_reporte === 3 || item.tipo_reporte === 9 ))
        .sort((a: Item, b: Item) => Number(b.id_reporte) - Number(a.id_reporte));
        setData(filteredData);
    
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };
    fetchData(); 
  }, [])
);


const renderIcon = (tipo_reporte:number,id:number ) => {
  switch(tipo_reporte) {
    case 2:
      return <Icon name="id-card" size={60} color="#5A87C6" style={styles.icono} />;
    case 3:
      return id
        ? <Icon name="compass" size={60} color="#5A87C6" style={styles.icono} />
        : <Icon name="compass-outline" size={60} color="#5A87C6" style={styles.icono} />;
    case 9:
      return <Iconc name="health-and-safety" size={60} color="#5A87C6" style={styles.icono} />;
    default:
      return <Icon name="help-circle-outline" size={60} color="#5A87C6" style={styles.icono} />;
  }
}


  return (
    <Container>
    {data.map(item => { 
      
      return (
        <TouchableOpacity key={item.id_reporte}
          onPress={() => {  
            switch(item.tipo_reporte) {
              case 2:
                servicioData(item.id_reporte);
                break;
              case 3:
                desplazamiento(item.id_reporte);
                break;
              case 9:
                salud(item.id_reporte);
                break;
              default:
                console.log('Tipo de reporte no manejado');
            }
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
            {renderIcon(item.tipo_reporte, item.id_reporte)}
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
                DI: {item.departamentoinicio} / DF: {item.departamentofin && item.departamentofin.trim() !== "" ? item.departamentofin : "Por definir"} 
              </Text>
              <Text style={styles.textoizquierda}>
                MI: {item.municipioinicio} / MF: {item.municipiofin && item.municipiofin.trim() !== "" ? item.municipiofin : "Por definir"}
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
                / UF: {
                  item.ubicacion_fin
                    ? item.ubicacion_fin.replace(
                        /SRID=4326;POINT \(([-\d.]+) ([-\d.]+)\)/,
                        (_: any, lon: string, lat: string) => `${parseFloat(lon).toFixed(5)}, ${parseFloat(lat).toFixed(5)}`
                      )
                    : 'Por definir'
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
      );
    })}
  </Container>
);
}

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

export default NReporteIndividualForm;


