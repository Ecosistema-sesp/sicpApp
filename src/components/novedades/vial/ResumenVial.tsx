import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import {  RouteProp, useRoute } from "@react-navigation/native";
import axios from 'axios';
import { Container } from '../../inicio/Contenedor';
import { TituloContainer } from '../TitulosContainer';
import { StackNavigatorParams as localStackNavigatorParams} from '../../panelnovedades/BotonVial';
import { useFormik} from 'formik';
import NombreApellido from '../ObtenerUsuario';


type RootStackParamList = {
    ResumenvialForm: ResumenvialProps;
  };

interface ResumenvialProps {
    id: any;
}

const ResumenvialForm = () => {
    const route = useRoute<RouteProp<localStackNavigatorParams, 'resumenVial'>>();
    const Id = route.params?.id;
    const [userId, setUserId] = useState<number | null>(null);
    const [vial, setVial] = useState(null);

    const vialForm = useFormik({

    initialValues:{
      id_reporte: '',
      usuario_sicp: '',
      fecha_creacion: '',
      fecha_actualizacion: '',
      fecha_inicio: '',
      departamentoinicio: '',
      municipioinicio: '',
      ubicacion_inicio: '',
      tiponovedadvial: '',
      
    },
    onSubmit: () => {},
      });

    useEffect(() => {
        if (Id) {
            console.log(Id)
        axios.get(`http://ecosistemasesp.unp.gov.co/sicp/api/vial/${Id}/`)
            .then(response => {
                vialForm.setValues(response.data);
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
    let ubicacion_inicio = vialForm.values.ubicacion_inicio || 'No disponible';
    if (ubicacion_inicio !== 'No disponible') {
        const coordenadas = ubicacion_inicio.split('(')[1].split(')')[0].split(' ');
        const longitud = parseFloat(coordenadas[0]).toFixed(5);
        const latitud = parseFloat(coordenadas[1]).toFixed(5);
        ubicacion_inicio = `${latitud}, ${longitud}`;
    }

    const padZero = (num: number) => num < 10 ? '0' + num : num;

    let fechaInicio = vialForm.values.fecha_inicio;
    let horaInicio = fechaInicio 
        ? padZero(new Date(fechaInicio).getHours()) + ':' + padZero(new Date(fechaInicio).getMinutes()) + ':' + padZero(new Date(fechaInicio).getSeconds())
        : 'No disponible';

   return (
    <Container>

        <TituloContainer
          iconName="person-circle-sharp"
          titulo="Persona que registra"
        />
        <NombreApellido setUserId={setUserId} desplazamiento={vialForm} />
          <>
            <Text style={styles.label}>Registro:</Text>
            <Text style={{...styles.text, marginBottom: 30}}>{vialForm.values.id_reporte}</Text>
          </>
        <TituloContainer
          iconName="chevron-forward-circle"
          titulo="Datos y ubicación"
        />
        <View style={styles.doble}>
            <View style={{width: '48%'}}>
              <Text style={styles.label}>Fecha:</Text>
              <Text style={styles.text}>{vialForm.values.fecha_inicio ? new Date(vialForm.values.fecha_inicio).toISOString().split('T')[0] : 'No disponible'}</Text>
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
            <Text style={styles.text}>{vialForm.values.departamentoinicio || 'No disponible'}</Text>
          </>
          <>
            <Text style={styles.label}>Municipio:</Text>
            <Text style={{...styles.text, marginBottom: 30}}>{vialForm.values.municipioinicio || 'No disponible'}</Text>
          </>
          <TituloContainer
          iconName="chevron-forward-circle"
          titulo="Datos de la novedad"
        />
        <>
            <Text style={styles.label}>Tipo de novedad del vehículo</Text>
            <Text style={styles.text}>{vialForm.values.tiponovedadvial || 'No disponible'}</Text>
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


const ResumenVialStack = createStackNavigator();

export default function ResumenVialStackScreen() {
  const route = useRoute<RouteProp<localStackNavigatorParams, 'resumenVial'>>();
  const id = route.params?.id;
  return (
  <ResumenVialStack.Navigator>
    <ResumenVialStack.Screen 
      name="ResumenvehiculoForm" 
      component={ResumenvialForm} 
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
  </ResumenVialStack.Navigator>
 );
}