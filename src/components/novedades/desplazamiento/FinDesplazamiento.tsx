import React, { useState, useEffect } from 'react';
import {View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { Container } from '../../inicio/Contenedor';
import { TituloContainer } from '../TitulosContainer';
import DepartamentoMunicipio from '../DepartamentoMunicipio';
import NombreApellido from '../ObtenerUsuario';
import Ubicacion from '../Ubicacion';
import FechaHora from '../FechaActual';
import { FormikValues, useFormik} from 'formik';
import AreaInput from '../textinput';
import { BotonSubmit } from '../../../navegacion/BotonSubmit';



type RootStackParamList = {
    Panel: undefined;
  };

interface FinDesplazamientoProps {
    Id: Number;
    desplazamiento :any
    
}
const FinDesplazamiento = ({ Id, desplazamiento }: FinDesplazamientoProps) => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [userId, setUserId] = useState<number | null>(null);
    const [fechaFin, setFechaFin] = useState('');


    const findesplazamiento = useFormik({
        initialValues:{
            fecha_actualizacion: new Date(),
            fecha_fin: new Date(),
            ubicacion_fin: '',
            departamento_fin: '',
            munipio_fin : '',
            observacion: '', 
        },
        onSubmit: async (values: FormikValues) => {
          try {
            if (Id) {
              await axios.put(`http://ecosistemasesp.unp.gov.co/sicp/api/dhesquema/${Id}/`, values);
            } else {
              await axios.post('http://ecosistemasesp.unp.gov.co/sicp/api/dhesquema/', values);
            }
            navigation.navigate('Panel');
          } catch (error) {
            if (axios.isAxiosError(error)) {
              const serverResponse = error.response;
              if (serverResponse) {
                console.log(serverResponse.data);
              }
            }
          }
        },
    });

    useEffect(() => {
        if (Id) {
        axios.get(`http://ecosistemasesp.unp.gov.co/sicp/api/dhesquema/${Id}/`)
            .then(response => {
            desplazamiento.setValues(response.data);
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

    let ubicacion_inicio = desplazamiento.values.ubicacion_inicio || 'No disponible';
      if (ubicacion_inicio !== 'No disponible') {
          const coordenadas = ubicacion_inicio.split('(')[1].split(')')[0].split(' ');
          const longitud = parseFloat(coordenadas[0]).toFixed(5);
          const latitud = parseFloat(coordenadas[1]).toFixed(5);
          ubicacion_inicio = `${latitud}, ${longitud}`;
      }

      const padZero = (num: number) => num < 10 ? '0' + num : num;
      let fechaInicio = desplazamiento.values.fecha_inicio;
      let hora = fechaInicio 
          ? padZero(new Date(fechaInicio).getHours()) + ':' + padZero(new Date(fechaInicio).getMinutes()) + ':' + padZero(new Date(fechaInicio).getSeconds())
          : 'No disponible';
      
    return (
        <Container>

          <TituloContainer
            iconName="person-circle-sharp"
            titulo="Persona, rol y registro"
          />
          <NombreApellido setUserId={setUserId} desplazamiento={desplazamiento} />
          <>
            <Text style={styles.label}>Registro:</Text>
            <Text style={{...styles.text, marginBottom: 30}}>{desplazamiento.values.id_reporte}</Text>
          </>
          <TituloContainer
            iconName="chevron-forward-circle"
            titulo="Datos y ubicación de inicio"
          />
          <View style={styles.doble}>
            <View style={{width: '48%'}}>
              <Text style={styles.label}>Fecha:</Text>
              <Text style={styles.text}>{desplazamiento.values.fecha_inicio ? new Date(desplazamiento.values.fecha_inicio).toISOString().split('T')[0] : 'No disponible'}</Text>
            </View>
            <View style={{width: '48%'}}>
              <Text style={styles.label}>Hora:</Text>
              <Text style={styles.text}>{hora}</Text>
            </View>
          </View>
          <>
            <Text style={styles.label}>Ubicacion:</Text>
            <Text style={styles.text}>{ubicacion_inicio || 'No disponible'}</Text>
          </>
          <>
            <Text style={styles.label}>Departamento:</Text>
            <Text style={styles.text}>{desplazamiento.values.departamentoinicio || 'No disponible'}</Text>
          </>
          <>
            <Text style={styles.label}>Municipio:</Text>
            <Text style={{...styles.text, marginBottom: 30}}>{desplazamiento.values.municipioinicio || 'No disponible'}</Text>
          </>

          <TituloContainer
          iconName="chevron-back-circle-sharp"
          titulo="Datos y ubicación de cierre"
          />

          <View style={{marginBottom: 30}}>
            <FechaHora variables={{fecha : fechaFin}} desplazamiento={desplazamiento} tipo='fin'/>
            <Ubicacion desplazamiento={findesplazamiento} tipo='fin' />
            <DepartamentoMunicipio desplazamiento={findesplazamiento} tipo='fin' />
          </View>

          <TituloContainer
          iconName="checkmark-done-circle"
          titulo="Observaciones"
          />

          <AreaInput placeholder='' onChangeText={(text) => findesplazamiento.setFieldValue('observacion', text)}/>

          <BotonSubmit handleSubmit={() => findesplazamiento.handleSubmit()} buttonText="Finalizar dezplazamiento" />

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

export default FinDesplazamiento;