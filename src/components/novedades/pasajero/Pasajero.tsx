import React, { useState, useEffect } from 'react';
import { FormikValues, useFormik} from 'formik';
import { View, StyleSheet, Text } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation, RouteProp, useRoute, NavigationProp } from "@react-navigation/native";
import axios from 'axios';

import NombreApellido from '../ObtenerUsuario';
import FechaHora from '../FechaActual';
import DepartamentoMunicipio from '../DepartamentoMunicipio';
import Ubicacion from '../Ubicacion';
import { Container } from '../../inicio/Contenedor';
import { InfoContainer, TituloContainer } from '../TitulosContainer';
import { StackNavigatorParams as localStackNavigatorParams} from '../../panelnovedades/BotonPasajero';
import { BotonSubmit } from '../../../navegacion/BotonSubmit';
import Cantidad from './Cantidad';
import FinPasajero from './FinPasajero';

  type RootStackParamList = {
    Panel: undefined;
  };

  type DhpasajeroForm = {
    desdePanelEsquema: boolean;
    id: any;
  };

const DhpasajeroForm = () => {

  const [userId, setUserId] = useState<number | null>(null);
  const [userRol, setUserRolId] = useState(2)
  const [fechaInicio, setFechaInicio] = useState('');
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<localStackNavigatorParams, 'novedadPasajero'>>();
  const { desdePanelEsquema, id } = route.params;

  const pasajero = useFormik({
    
    initialValues:{
      usuario_sicp: userId || '',
      fecha_creacion: new Date(),
      fecha_actualizacion: new Date(),
      fecha_inicio: '',
      fecha_fin: new Date(),
      departamento_inicio: '',
      municipio_inicio: '',
      ubicacion_inicio: '',
      ubicacion_fin: '',
      departamento_fin: '',
      municipio_fin: '',
      cantidad_pasajeros: 0,
      cantidad_menores: 0,
      cantidad_amayor: 0,
      cantidad_pdiscapacidad: 0,
      cantidad_adulto: 0,
      observacion: '', 
      tipo_reporte: 4,
      
    },
    
    onSubmit: async (values: FormikValues) => {
      try {
        await axios.post('http://ecosistemasesp.unp.gov.co/sicp/api/pasajero/', values);
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
    if (userId !== null) {
      pasajero.setValues({
        ...pasajero.values,
        usuario_sicp: userId,
      });
    }
  }, [userId]);

  
  useEffect(() => {
    if (id) {
      axios.get(`http://ecosistemasesp.unp.gov.co/sicp/api/pasajero/${id}/`)
        .then(response => {
          pasajero.setValues(response.data);
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
  }, [id]);

    let total = pasajero.values.cantidad_pasajeros;
    let adulto = 0;
    let menor = 0;

    if (pasajero.values.cantidad_menores > 0 && total >0)
        adulto = total-pasajero.values.cantidad_menores;
    else
        adulto= total;

    if (pasajero.values.cantidad_adulto > 0 && total >0)
        menor = total-pasajero.values.cantidad_adulto;
    else
        menor= total;

  return(
    <Container>
   
    {desdePanelEsquema ? (
      <>
        <FinPasajero Id={id} pasajero={pasajero} />
      </>
    ) : (
      <>
        <TituloContainer
          iconName="person-circle-sharp"
          titulo="Persona y rol "
        />
        
        <NombreApellido setUserId={setUserId} desplazamiento={pasajero} />

        <TituloContainer
          iconName="chevron-forward-circle"
          titulo="Datos y ubicación de inicio"
        />
        <FechaHora variables={{fecha : fechaInicio}} desplazamiento={pasajero} tipo='fecha_inicio'/>
        <Ubicacion desplazamiento={pasajero} tipo='inicio' />
        <DepartamentoMunicipio desplazamiento={pasajero} tipo='inicio' />

        <TituloContainer
          iconName="chevron-forward-circle"
          titulo="Cantidad de pasajeros"
        />
        <View style={styles.cantidad}>
            <View style={styles.fila}>
                <Text style={styles.texto}>
                    Total:
                </Text>
                <Cantidad pasajero={pasajero} valor= {7} onValueChange={(value) => { pasajero.setFieldValue('cantidad_pasajeros', value) }} />
            </View>
            <View style={styles.fila}>
                <Text style={styles.texto}>
                    Adultos:
                </Text>
                <Cantidad pasajero={pasajero} valor= {adulto} onValueChange={(value) => { pasajero.setFieldValue('cantidad_adulto', value) }}  />
            </View>
        </View>

        <View style={styles.cantidad}>
            <View style={styles.fila}>
                <Text style={styles.texto}>
                    Menores:
                </Text>
                <Cantidad pasajero={pasajero} valor= {menor} onValueChange={(value) => { pasajero.setFieldValue('cantidad_menores', value) }} />
            </View>                    
            <View style={styles.fila}>
                <Text style={styles.texto}>
                    Adulto mayor:
                </Text>
                <Cantidad pasajero={pasajero} valor= {adulto} onValueChange={(value) => { pasajero.setFieldValue('cantidad_amayor', value) }} />
            </View>
        </View>
        <View style={styles.cantidad}>
            <View style={styles.fila}>
                <Text style={styles.texto}>
                    Con discapacidad:
                </Text>
                <Cantidad pasajero={pasajero} valor= {total} onValueChange={(value) => { pasajero.setFieldValue('cantidad_pdiscapacidad', value) }} />
            </View>
        </View>
        <InfoContainer />
        

        <BotonSubmit handleSubmit={() => pasajero.handleSubmit()} buttonText="Registrar pasajeros" />
      </>
    )}
  </Container>
  )}


  const styles = StyleSheet.create({
    cantidad: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    texto: {
        color: '#00447C',
        marginBottom: 5,
        fontWeight: '500',
        fontSize: 16,
      },
      fila: {
        flexDirection: 'column'
      }
})


  const PasajeroStack = createStackNavigator();
  export default function PasajeroStackScreen() {
    const route = useRoute<RouteProp<localStackNavigatorParams, 'novedadPasajero'>>();
    const desdePanelEsquema = route.params?.desdePanelEsquema;
    const id = route.params?.id;
    return (
    <PasajeroStack.Navigator>
      <PasajeroStack.Screen 
        name="DhpasajeroForm" 
        component={DhpasajeroForm} 
        initialParams={{ desdePanelEsquema: desdePanelEsquema, id: id }}
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
    </PasajeroStack.Navigator>
    );
  }
