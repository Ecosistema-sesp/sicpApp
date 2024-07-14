import React, { useState, useEffect } from 'react';
import { FormikValues, useFormik} from 'formik';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation, RouteProp, useRoute, NavigationProp } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/Ionicons';
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
            titulo="Persona de protección"
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
          
          <BotonSubmit handleSubmit={() => desplazamiento.handleSubmit()} buttonText="Registrar" />

        </>
      )}

    </Container>

  )}


const DesplazamientoStack = createStackNavigator();

export default function DesplazamientoStackScreen() {

  const route = useRoute<RouteProp<localStackNavigatorParams, 'NovedadDesplazamiento'>>();
  const desdePanelNovedades = route.params?.desdePanelNovedades;
  const id = route.params?.id;
  const navigationBack = useNavigation();
  const navigationHome = useNavigation();

  const BotonFlotanteTocado = () => {
      navigationHome.navigate("Panel");
  }  

  return (

    <DesplazamientoStack.Navigator>

      <DesplazamientoStack.Screen
       
        name="DhdesplazamientoForm" 
        component={DhdesplazamientoForm} 
        initialParams={{ desdePanelNovedades: desdePanelNovedades, id: id }}

        options={{ 

          headerTitleAlign: 'center',

          headerStyle: {
            backgroundColor: '#FFF',
            borderBottomWidth: 1,
            borderBottomColor: '#F3EDF6',
            height: 80,
          },

          headerTitle: () => (
            <View>
                <Text style={styles.textoHeader}>Inicio del desplazamiento</Text>
            </View>
          ),

          headerLeft: () => (

            <TouchableOpacity
              onPress={() => navigationBack.goBack()}
              style={{ marginLeft: 10, paddingTop: 10 }}
            >
              <Icon
                name="arrow-back-outline"
                size={28}
                color="#00447C"
                style={{ fontWeight: 'bold' }}
              />
            </TouchableOpacity>
          ),

          headerRight: () => (
            
            <TouchableOpacity
              onPress={BotonFlotanteTocado}
              style={{ marginRight: 10, paddingTop: 10 }}
            >
              <Icon
                name="home"
                size={24}
                color="#00447C"
                style={{ fontWeight: 'bold' }}
              />
            </TouchableOpacity>
          ),
          
        }}

      />

    </DesplazamientoStack.Navigator>

  );

}

const styles = StyleSheet.create({

  textoHeader: {
    color: '#00447C',
    fontWeight: '800',
    fontSize: 19,
    paddingTop: 10,
  },
  
});
