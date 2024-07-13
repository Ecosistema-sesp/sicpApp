import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import {  RouteProp, useRoute } from "@react-navigation/native";
import axios from 'axios';
import { Container } from '../../inicio/Contenedor';
import { TituloContainer } from '../TitulosContainer';
import { StackNavigatorParams as localStackNavigatorParams} from '../../panelnovedades/BotonInicioMision';
import { useFormik} from 'formik';
import NombreApellido from '../ObtenerUsuario';



type RootStackParamList = {
    ResumenComisionForm: ResumenComisionProps;
  };

interface ResumenComisionProps {
    id: any;
}

const ResumenComisionForm = () => {
    const route = useRoute<RouteProp<localStackNavigatorParams, 'resumenComision'>>();
    const Id = route.params?.id;
    console.log(route.params)
    const [userId, setUserId] = useState<number | null>(null);


    const [Comision, setComision] = useState(null);

    const ComisionForm = useFormik({

        initialValues:{
            id_reporte:'',
            usuario_sicp:'',
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
            vereda_cinicio: '',
            vereda_cfin: '',
            numero_ppinician: '',
            numero_ppterminan: '', 
            numero_pmiinician: '',
            numero_pmiterminan: '',
            kilometraje_inicial: '',
            kilometraje_final: '',
            observacion: '',
          },
    onSubmit: () => {},
      });

    useEffect(() => {
        if (Id) {
            console.log(Id)
        axios.get(`http://ecosistemasesp.unp.gov.co/sicp/api/comision/${Id}/`)
            .then(response => {
                ComisionForm.setValues(response.data);
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
    let ubicacion_inicio = ComisionForm.values.ubicacion_inicio || 'No disponible';
    let ubicacion_fin = ComisionForm.values.ubicacion_inicio || 'No disponible';
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

    let fechaInicio = ComisionForm.values.fecha_inicio;
    let fechaFin = ComisionForm.values.fecha_fin;
    
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
        <NombreApellido setUserId={setUserId} desplazamiento={ComisionForm} />
          <>
            <Text style={styles.label}>Registro:</Text>
            <Text style={{...styles.text, marginBottom: 30}}>{ComisionForm.values.id_reporte}</Text>
          </>
        <TituloContainer
          iconName="chevron-forward-circle"
          titulo="Fecha y ubicación de inicio"
        />
        <View style={styles.doble}>
            <View style={{width: '48%'}}>
              <Text style={styles.label}>Fecha:</Text>
              <Text style={styles.text}>{ComisionForm.values.fecha_inicio ? new Date(ComisionForm.values.fecha_inicio).toISOString().split('T')[0] : 'No disponible'}</Text>
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
            <Text style={styles.text}>{ComisionForm.values.departamentoinicio || 'No disponible'}</Text>
          </>
          <>
            <Text style={styles.label}>Municipio:</Text>
            <Text style={{...styles.text}}>{ComisionForm.values.municipioinicio || 'No disponible'}</Text>
          </>
          <>
            <Text style={styles.label}>Vereda, corregimimiento u otro de inicio:</Text>
            <Text style={{...styles.text, marginBottom: 30}}>{ComisionForm.values.vereda_cinicio || 'No disponible'}</Text>
          </>
        <TituloContainer
          iconName="chevron-back-circle-sharp"
          titulo="Cantidad"
        />
        <View style={styles.doble}>
            <View style={{width: '48%'}}>
              <Text style={styles.label}>P. proteccion inicia:</Text>
              <Text style={styles.text}>{ComisionForm.values.numero_ppinician || 'No disponible'}</Text>
            </View>
            <View style={{width: '48%'}}>
              <Text style={styles.label}>P. proteccion inicia:</Text>
              <Text style={styles.text}>{ComisionForm.values.numero_ppterminan || 'No disponible'}</Text>
            </View>
        </View>
        <View style={styles.doble}>
            <View style={{width: '48%'}}>
              <Text style={styles.label}>PMI inician:</Text>
              <Text style={styles.text}>{ComisionForm.values.numero_pmiinician || '0'}</Text>
            </View>
            <View style={{width: '48%'}}>
              <Text style={styles.label}>PMI terminan :</Text>
              <Text style={styles.text}>{ComisionForm.values.numero_pmiterminan || 'No disponible'}</Text>
            </View>
        </View>
        <View style={styles.doble}>
            <View style={{width: '48%', marginBottom:30}}>
              <Text style={styles.label}>Kilometraje inicial:</Text>
              <Text style={styles.text}>{ComisionForm.values.kilometraje_inicial || '0'}</Text>
            </View>
            <View style={{width: '48%', marginBottom:30}}>
              <Text style={styles.label}>Kilometraje final:</Text>
              <Text style={styles.text}>{ComisionForm.values.kilometraje_final || '0'}</Text>
            </View>
        </View>

        <TituloContainer
          iconName="chevron-forward-circle"
          titulo="Fecha y ubicación de terminación"
        />

        <View style={styles.doble}>
            <View style={{width: '48%'}}>
              <Text style={styles.label}>Fecha:</Text>
              <Text style={styles.text}>{ComisionForm.values.fecha_fin ? new Date(ComisionForm.values.fecha_inicio).toISOString().split('T')[0] : 'No disponible'}</Text>
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
            <Text style={styles.text}>{ComisionForm.values.departamentofin || 'No disponible'}</Text>
          </>
          <>
            <Text style={styles.label}>Municipio:</Text>
            <Text style={{...styles.text}}>{ComisionForm.values.municipiofin || 'No disponible'}</Text>
          </>
          <>
            <Text style={styles.label}>Vereda, corregimimiento u otro de fin:</Text>
            <Text style={{...styles.text}}>{ComisionForm.values.vereda_cfin || 'No disponible'}</Text>
          </>
          <>
            <Text style={styles.label}>observación:</Text>
            <Text style={{...styles.text, marginBottom: 30}}>{ComisionForm.values.observacion}</Text>
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


const ResumenComisionStack = createStackNavigator();

export default function ResumenComisionStackScreen() {
  const route = useRoute<RouteProp<localStackNavigatorParams, 'resumenComision'>>();
  const id = route.params?.id;
  return (
  <ResumenComisionStack.Navigator>
    <ResumenComisionStack.Screen 
      name="ResumencomisionForm" 
      component={ResumenComisionForm} 
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
  </ResumenComisionStack.Navigator>
 );
}