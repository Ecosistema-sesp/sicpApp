import React, { useState, useEffect } from 'react';
import { FormikValues, useFormik} from 'formik';
import { View, StyleSheet, Text } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation, RouteProp, useRoute, NavigationProp } from "@react-navigation/native";
import axios from 'axios';


import { Container } from '../../inicio/Contenedor';
import { InfoContainer, TituloContainer } from '../TitulosContainer';
import { StackNavigatorParams as localStackNavigatorParams} from '../../panelnovedades/BotonDesplazamiento';
import FinDesplazamiento from './FinDesplazamiento';
import { BotonSubmit } from '../../../navegacion/BotonSubmit';
import NombreApellido from '../ObtenerUsuario';
import FechaHora from '../FechaActual';
import Ubicacion from '../Ubicacion';
import DepartamentoMunicipio from '../DepartamentoMunicipio';

type RootStackParamList = {
  Panel: undefined;
};

type DhdesplazamientoForm = {
  desdePanelNovedades: boolean;
  id: any;
};

const DhdesplazamientoForm = () => {
  const route = useRoute<RouteProp<localStackNavigatorParams, 'NovedadDesplazamiento'>>();
  const { desdePanelNovedades, id } = route.params;
  const [userId, setUserId] = useState<number | null>(null);
  const [userRol, setUserRolId] = useState(2)
  const [fechaInicio, setFechaInicio] = useState('');
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  
  const desplazamiento = useFormik({
    
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
      munipio_fin: '',
      observacion: '', 
      tipo_reporte: 3,
    },
    
    onSubmit: async (values: FormikValues) => {
      try {
        await axios.post('http://ecosistemasesp.unp.gov.co/sicp/api/dhesquema/', values);
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
      desplazamiento.setValues({
        ...desplazamiento.values,
        usuario_sicp: userId,
      });
    }
  }, [userId]);

  
  useEffect(() => {
    if (id) {
      axios.get(`http://ecosistemasesp.unp.gov.co/sicp/api/dhesquema/${id}/`)
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
  }, [id]);
  return(
    <Container>
   
    {desdePanelNovedades ? (
      <>
        <FinDesplazamiento Id={id} desplazamiento={desplazamiento} />
      </>
    ) : (
      <>
        <TituloContainer
          iconName="person-circle-sharp"
          titulo="Persona que registra"
        />
        
        <NombreApellido setUserId={setUserId} desplazamiento={desplazamiento} />

        <TituloContainer
          iconName="chevron-forward-circle"
          titulo="Datos y ubicación de inicio"
        />

        <FechaHora variables={{fecha : fechaInicio}} desplazamiento={desplazamiento} tipo='fecha_inicio'/>
        <Ubicacion desplazamiento={desplazamiento} tipo='inicio' />
        <DepartamentoMunicipio desplazamiento={desplazamiento} tipo='inicio' />
        <InfoContainer />
        
        <BotonSubmit handleSubmit={() => desplazamiento.handleSubmit()} buttonText="Iniciar dezplazamiento" />
      </>
    )}
  </Container>
  )}


const DesplazamientoStack = createStackNavigator();
export default function DesplazamientoStackScreen() {
  const route = useRoute<RouteProp<localStackNavigatorParams, 'NovedadDesplazamiento'>>();
  const desdePanelNovedades = route.params?.desdePanelNovedades;
  const id = route.params?.id;
  return (
  <DesplazamientoStack.Navigator>
    <DesplazamientoStack.Screen 
      name="DhdesplazamientoForm" 
      component={DhdesplazamientoForm} 
      initialParams={{ desdePanelNovedades: desdePanelNovedades, id: id }}
      options={{ 
        headerStyle: {
          backgroundColor: '#F4F2F3',
          borderBottomWidth: 1,
          borderBottomColor: '#F3EDF6', 
        },
        headerTitle: () => (
          <View style={{ width: 250}}>
              <Text>Registro de desplazamiento</Text>
          </View>
        ),
      }}
    />
  </DesplazamientoStack.Navigator>
  );
}
