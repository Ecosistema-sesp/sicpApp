
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { useServicio } from './servicio/RutaServicio';
import { desplazamientoUbicacionFin, useDesplazamiento } from './desplazamiento/rutadesplazamiento';


interface Item {
    id_reporte: number;
    tipo_reporte: number;
    departamentoinicio: string;
    departamentofin: string;
    municipioinicio: string;
    municipiofin: string;
    ubicacion_inicio: string;
    ubicacion_fin: string;
    fecha_inicio: string;
  }

  
  interface UbicacionFin {
    item : any;
    
  }

const ReporteItem = ({ item, ubicacionFin }: { item: Item, ubicacionFin: UbicacionFin }) => {
    const servicioData = useServicio();
    const desplazamiento = useDesplazamiento();
  
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

  export default ReporteItem
  
  
  