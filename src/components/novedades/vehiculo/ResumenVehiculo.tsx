import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import {  RouteProp, useRoute } from "@react-navigation/native";
import axios from 'axios';
import { Container } from '../../inicio/Contenedor';
import { TituloContainer } from '../TitulosContainer';
import { StackNavigatorParams as localStackNavigatorParams} from '../../panelnovedades/BotonVehiculo';
import { useFormik} from 'formik';
import NombreApellido from '../ObtenerUsuario';


type RootStackParamList = {
    ResumenvehiculoForm: ResumenvehiculoProps;
  };

interface ResumenvehiculoProps {
    id: any;
}

const ResumenvehiculoForm = () => {
    const route = useRoute<RouteProp<localStackNavigatorParams, 'resumenVehiculo'>>();
    const Id = route.params?.id;
    const [userId, setUserId] = useState<number | null>(null);
    const [vehiculo, setVehiculo] = useState(null);

    const vehiculoForm = useFormik({

    initialValues:{
      id_nvehiculo: '',
      usuario_sicp: '',
      rol_usuariosicp: '',
      fecha_creacion: '',
      fecha_actualizacion: '',
      fecha_inicio: '',
      departamentoinicio: '',
      municipioinicio: '',
      ubicacion_inicio: '',
      tiponovedadvehiculo: '',
      categorianovedadvehiculo:'',
      placa: '',
        
    },
    onSubmit: () => {},
      });

    useEffect(() => {
        if (Id) {
            console.log(Id)
        axios.get(`http://ecosistemasesp.unp.gov.co/sicp/api/vehiculo/${Id}/`)
            .then(response => {
                vehiculoForm.setValues(response.data);
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
    let ubicacion_inicio = vehiculoForm.values.ubicacion_inicio || 'No disponible';
    if (ubicacion_inicio !== 'No disponible') {
        const coordenadas = ubicacion_inicio.split('(')[1].split(')')[0].split(' ');
        const longitud = parseFloat(coordenadas[0]).toFixed(5);
        const latitud = parseFloat(coordenadas[1]).toFixed(5);
        ubicacion_inicio = `${latitud}, ${longitud}`;
    }

    const padZero = (num: number) => num < 10 ? '0' + num : num;

    let fechaInicio = vehiculoForm.values.fecha_inicio;
    let horaInicio = fechaInicio 
        ? padZero(new Date(fechaInicio).getHours()) + ':' + padZero(new Date(fechaInicio).getMinutes()) + ':' + padZero(new Date(fechaInicio).getSeconds())
        : 'No disponible';

   return (
    <Container>

        <TituloContainer
          iconName="person-circle-sharp"
          titulo="Persona que registra"
        />
        <NombreApellido setUserId={setUserId} desplazamiento={vehiculoForm} />
          <>
            <Text style={styles.label}>Registro:</Text>
            <Text style={{...styles.text, marginBottom: 30}}>{vehiculoForm.values.id_nvehiculo}</Text>
          </>
        <TituloContainer
          iconName="chevron-forward-circle"
          titulo="Datos y ubicación"
        />
        <View style={styles.doble}>
            <View style={{width: '48%'}}>
              <Text style={styles.label}>Fecha:</Text>
              <Text style={styles.text}>{vehiculoForm.values.fecha_inicio ? new Date(vehiculoForm.values.fecha_inicio).toISOString().split('T')[0] : 'No disponible'}</Text>
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
            <Text style={styles.text}>{vehiculoForm.values.departamentoinicio || 'No disponible'}</Text>
          </>
          <>
            <Text style={styles.label}>Municipio:</Text>
            <Text style={{...styles.text, marginBottom: 30}}>{vehiculoForm.values.municipioinicio || 'No disponible'}</Text>
          </>
          <TituloContainer
          iconName="chevron-forward-circle"
          titulo="Datos de la novedad"
        />
        <>
            <Text style={styles.label}>Tipo de novedad del vehículo</Text>
            <Text style={styles.text}>{vehiculoForm.values.tiponovedadvehiculo || 'No disponible'}</Text>
        </>
        <>
            <Text style={styles.label}>Categoría de la novedad del vehículo</Text>
            <Text style={styles.text}>{vehiculoForm.values.categorianovedadvehiculo || 'No disponible'}</Text>
        </>
        <>
            <Text style={styles.label}>Placa</Text>
            <Text style={styles.text}>{vehiculoForm.values.placa || 'No disponible'}</Text>
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


const ResumenVehiculoStack = createStackNavigator();

export default function ResumenVehiculoStackScreen() {
  const route = useRoute<RouteProp<localStackNavigatorParams, 'resumenVehiculo'>>();
  const id = route.params?.id;
  return (
  <ResumenVehiculoStack.Navigator>
    <ResumenVehiculoStack.Screen 
      name="ResumenvehiculoForm" 
      component={ResumenvehiculoForm} 
      initialParams={{ id: id}}
      options={{ 
        headerStyle: {
          backgroundColor: '#F4F2F3',
          borderBottomWidth: 1,
          borderBottomColor: '#F3EDF6', 
        },
        headerTitle: () => (
          <View style={{ width: 250}}>
              <Text>Registro de vehiculo</Text>
          </View>
        ),
      }}
    />
  </ResumenVehiculoStack.Navigator>
 );
}