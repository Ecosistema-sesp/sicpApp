import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import {  RouteProp, useRoute } from "@react-navigation/native";
import axios from 'axios';
import { Container } from '../../inicio/Contenedor';
import { TituloContainer } from '../TitulosContainer';
import { StackNavigatorParams as localStackNavigatorParams} from '../../panelnovedades/BotonPasajero';
import { useFormik} from 'formik';
import NombreApellido from '../ObtenerUsuario';



type RootStackParamList = {
    ResumenpasajeroForm: ResumenpasajeroProps;
  };

interface ResumenpasajeroProps {
    id: any;
}

const ResumenpasajeroForm = () => {
    const route = useRoute<RouteProp<localStackNavigatorParams, 'resumenPasajero'>>();
    const Id = route.params?.id;
    console.log(route.params)
    const [userId, setUserId] = useState<number | null>(null);


    const [pasajero, setPasajero] = useState(null);

    const pasajeroForm = useFormik({

    initialValues:{
      id_reporte: '',
      usuario_sicp: '',
      fecha_creacion: '',
      fecha_actualizacion: '',
      fecha_inicio: '',
      fecha_fin: '',
      departamentoinicio: '',
      municipioinicio: '',
      ubicacion_inicio: '',
      ubicacion_fin: '',
      departamentofin: '',
      municipiofin: '',
      cantidad_pasajeros: '',
      cantidad_menores: '',
      cantidad_amayor: '',
      cantidad_pdiscapacidad: '',
      cantidad_adulto: '',
  
    },
    onSubmit: () => {},
      });

    useEffect(() => {
        if (Id) {
            console.log(Id)
        axios.get(`http://ecosistemasesp.unp.gov.co/sicp/api/pasajero/${Id}/`)
            .then(response => {
                pasajeroForm.setValues(response.data);
            })
            .catch(error => {
            if (axios.isAxiosError(error)) {
                const serverResponse = error.response;
                if (serverResponse) {
                console.log(serverResponse.data);
                }
            }
            });
        }
    }, [Id]);
    let ubicacion_inicio = pasajeroForm.values.ubicacion_inicio || 'No disponible';
    let ubicacion_fin = pasajeroForm.values.ubicacion_inicio || 'No disponible';
    if (ubicacion_inicio !== 'No disponible') {
        const coordenadas = ubicacion_inicio.split('(')[1].split(')')[0].split(' ');
        const longitud = parseFloat(coordenadas[0]).toFixed(5);
        const latitud = parseFloat(coordenadas[1]).toFixed(5);
        ubicacion_inicio = `${latitud}, ${longitud}`;
    }
    if (ubicacion_fin !== 'No disponible') {
        const coordenadas = ubicacion_fin.split('(')[1].split(')')[0].split(' ');
        const longitud = parseFloat(coordenadas[0]).toFixed(5);
        const latitud = parseFloat(coordenadas[1]).toFixed(5);
        ubicacion_fin = `${latitud}, ${longitud}`;
    }


    const padZero = (num: number) => num < 10 ? '0' + num : num;

    let fechaInicio = pasajeroForm.values.fecha_inicio;
    let fechaFin = pasajeroForm.values.fecha_fin;
    
    let horaInicio = fechaInicio 
        ? padZero(new Date(fechaInicio).getHours()) + ':' + padZero(new Date(fechaInicio).getMinutes()) + ':' + padZero(new Date(fechaInicio).getSeconds())
        : 'No disponible';
    
    let horaFin = fechaFin 
        ? padZero(new Date(fechaFin).getHours()) + ':' + padZero(new Date(fechaFin).getMinutes()) + ':' + padZero(new Date(fechaFin).getSeconds())
        : 'No disponible';
    

   return (
    <Container>

        <TituloContainer
          iconName="person-circle-sharp"
          titulo="Persona que registra"
        />
        <NombreApellido setUserId={setUserId} desplazamiento={pasajeroForm} />
          <>
            <Text style={styles.label}>Registro:</Text>
            <Text style={{...styles.text, marginBottom: 30}}>{pasajeroForm.values.id_reporte}</Text>
          </>
        <TituloContainer
          iconName="chevron-forward-circle"
          titulo="Datos y ubicación de inicio"
        />
        <View style={styles.doble}>
            <View style={{width: '48%'}}>
              <Text style={styles.label}>Fecha:</Text>
              <Text style={styles.text}>{pasajeroForm.values.fecha_inicio ? new Date(pasajeroForm.values.fecha_inicio).toISOString().split('T')[0] : 'No disponible'}</Text>
            </View>
            <View style={{width: '48%'}}>
              <Text style={styles.label}>Hora:</Text>
              <Text style={styles.text}>{horaInicio}</Text>
            </View>
        </View>
          <>
            <Text style={styles.label}>Ubicacion:</Text>
            <Text style={styles.text}>{ubicacion_inicio || 'No disponible'}</Text>
          </>
          <>
            <Text style={styles.label}>Departamento:</Text>
            <Text style={styles.text}>{pasajeroForm.values.departamentoinicio || 'No disponible'}</Text>
          </>
          <>
            <Text style={styles.label}>Municipio:</Text>
            <Text style={{...styles.text, marginBottom: 30}}>{pasajeroForm.values.municipioinicio || 'No disponible'}</Text>
          </>
        <TituloContainer
          iconName="chevron-back-circle-sharp"
          titulo="Número de pasajeros"
        />
        <View style={styles.doble}>
            <View style={{width: '48%'}}>
              <Text style={styles.label}>pasajeros:</Text>
              <Text style={styles.text}>{pasajeroForm.values.cantidad_pasajeros || 'No disponible'}</Text>
            </View>
            <View style={{width: '48%'}}>
              <Text style={styles.label}>Adultos:</Text>
              <Text style={styles.text}>{pasajeroForm.values.cantidad_adulto || 'No disponible'}</Text>
            </View>
        </View>
        <View style={styles.doble}>
            <View style={{width: '48%'}}>
              <Text style={styles.label}>Menores:</Text>
              <Text style={styles.text}>{pasajeroForm.values.cantidad_menores || '0'}</Text>
            </View>
            <View style={{width: '48%'}}>
              <Text style={styles.label}>Adulto mayor :</Text>
              <Text style={styles.text}>{pasajeroForm.values.cantidad_adulto || 'No disponible'}</Text>
            </View>
        </View>
        <View style={styles.doble}>
            <View style={{width: '48%'}}>
              <Text style={styles.label}>Discapacidad:</Text>
              <Text style={styles.text}>{pasajeroForm.values.cantidad_pdiscapacidad || '0'}</Text>
            </View>
        </View>

        <TituloContainer
          iconName="chevron-back-circle-sharp"
          titulo="Datos y ubicación de cierre"
        />

        <View style={styles.doble}>
            <View style={{width: '48%'}}>
              <Text style={styles.label}>Fecha:</Text>
              <Text style={styles.text}>{pasajeroForm.values.fecha_fin ? new Date(pasajeroForm.values.fecha_inicio).toISOString().split('T')[0] : 'No disponible'}</Text>
            </View>
            <View style={{width: '48%'}}>
              <Text style={styles.label}>Hora:</Text>
              <Text style={styles.text}>{horaFin}</Text>
            </View>
          </View>
          <>
            <Text style={styles.label}>Ubicacion:</Text>
            <Text style={styles.text}>{ubicacion_fin || 'No disponible'}</Text>
          </>
          <>
            <Text style={styles.label}>Departamento:</Text>
            <Text style={styles.text}>{pasajeroForm.values.departamentofin || 'No disponible'}</Text>
          </>
          <>
            <Text style={styles.label}>Municipio:</Text>
            <Text style={{...styles.text, marginBottom: 30}}>{pasajeroForm.values.municipiofin || 'No disponible'}</Text>
          </>


  </Container>
  )
}


const styles = StyleSheet.create({
    text: {
      height: 48,
      fontSize: 17,
      color: '#5A87C6',
      fontWeight: '400',
      borderColor: '#CED4DA',
      borderWidth: 1,
      borderRadius: 7,
      paddingLeft: 15,
      textAlignVertical: 'center',
      marginBottom: 10,
    },
    label: {
      color: '#00447C',
      marginBottom: 5,
      fontWeight: '500',
      fontSize: 16,
    },
    doble: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
    }
  })


const ResumenPasajeroStack = createStackNavigator();

export default function ResumenPasajeroStackScreen() {
  const route = useRoute<RouteProp<localStackNavigatorParams, 'resumenPasajero'>>();
  const id = route.params?.id;
  return (
  <ResumenPasajeroStack.Navigator>
    <ResumenPasajeroStack.Screen 
      name="ResumenpasajeroForm" 
      component={ResumenpasajeroForm} 
      initialParams={{ id: id}}
      options={{ 
        headerStyle: {
          backgroundColor: '#F4F2F3',
          borderBottomWidth: 1,
          borderBottomColor: '#F3EDF6', 
        },
        headerTitle: () => (
          <View style={{ width: 250}}>
              <Text>Registro de pasajero</Text>
          </View>
        ),
      }}
    />
  </ResumenPasajeroStack.Navigator>
 );
}