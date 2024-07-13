import React, { useState, useEffect } from 'react';
import { FormikValues, useFormik} from 'formik';
import { View, StyleSheet, Text } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation, RouteProp, useRoute, NavigationProp } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { StackNavigatorParams as localStackNavigatorParams} from '../../panelnovedades/BotonSalud';
import { Container } from '../../inicio/Contenedor';
import NombreApellido from '../ObtenerUsuario';
import { BotonSubmit } from '../../../navegacion/BotonSubmit';
import NetInfo from "@react-native-community/netinfo";
import { InfoContainer, TituloContainer } from '../TitulosContainer';
import FechaHora from '../FechaActual';
import Ubicacion from '../Ubicacion';
import { obtenerIdUsuario } from '../../../../BaseDatos/DatosBasicos';
import { enviarDatosTablaTemporalServicio, insertarDatosServicio } from '../../../../BaseDatos/Servicio';
import AreaInput from '../textinput';
import DepartamentoMunicipio from '../DepartamentoMunicipio';


type RootStackParamList = {
  Panel: undefined;
};

type DhSaludForm = {
  desdePanelNovedades: boolean;
  id: any;
};

const getUsername = async () => {
  try {
    const username = await AsyncStorage.getItem('username');
    return username;
  } catch (error) {
    console.log(error);
  }
};

const DhSaludForm = () => {
  const route = useRoute<RouteProp<localStackNavigatorParams, 'novedadSalud'>>();
  const [fechaInicio, setFechaInicio] = useState('');
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [userId, setUserId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const { desdePanelNovedades, id } = route.params;
  
  const Salud = useFormik({
    initialValues:{
      usuario_sicp: userId,
      fecha_creacion: new Date(),
      fecha_actualizacion: new Date(),
      fecha_inicio: '',
      ubicacion_inicio: '',
      observacion: '',
      tipo_reporte: 9,
      departamento_inicio: '',
      municipio_inicio: '',
    },
    
    onSubmit: async (values: FormikValues) => {
      try {
        await axios.post('http://ecosistemasesp.unp.gov.co/sicp/api/salud/', values);
        //insertarDatosServicio(values);
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
    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.isConnected && state.isInternetReachable) {
        //enviarDatosTablaTemporalServicio();
      }
    });
      return unsubscribe;
  }, []);

  useEffect(() => {
    const fetchUserId = async () => {
      const username = await getUsername();
      const userid = await obtenerIdUsuario(username);
      setUserId(userid);
      setLoading(false);
    };
  
    fetchUserId();
  }, []);
  
  useEffect(() => {
    if (userId !== null) {
      Salud.setFieldValue('usuario_sicp', userId);
    }
  }, [userId]);

  if (loading) {  
    return null;
  }

  return (
    <Container>
    {desdePanelNovedades ? (
      <>
      </>
    ) : (
      <>
        <TituloContainer
          iconName="person-circle-sharp"
          titulo="Persona que registra"
        />
        
        <NombreApellido setUserId={setUserId} desplazamiento={Salud} />

        <TituloContainer
          iconName="chevron-forward-circle"
          titulo="Datos y ubicación de inicio"
        />
        <FechaHora variables={{fecha : fechaInicio}} desplazamiento={Salud} tipo='fecha_inicio'/>
        <DepartamentoMunicipio desplazamiento={Salud} tipo='inicio' />
        <Ubicacion desplazamiento={Salud} tipo='inicio' />
        <TituloContainer
          iconName="checkmark-done-circle"
          titulo="Observaciones"
          />
        <AreaInput placeholder='' onChangeText={(text) => Salud.setFieldValue('observacion', text)}/>
        <BotonSubmit handleSubmit={() => Salud.handleSubmit()} buttonText="Guardar reporte" />

      </>
    )}
    </Container>
  )
}

const SaludStack = createStackNavigator();
export default function SaludStackScreen() {
  const route = useRoute<RouteProp<localStackNavigatorParams, 'novedadSalud'>>();
  const desdePanelNovedades = route.params?.desdePanelNovedades;
  const id = route.params?.id;
  return (
  <SaludStack.Navigator>
    <SaludStack.Screen 
      name="DhSaludForm" 
      component={DhSaludForm} 
      initialParams={{ desdePanelNovedades: desdePanelNovedades, id: id }}
      options={{ 
        headerStyle: {
          backgroundColor: '#F4F2F3',
          borderBottomWidth: 1,
          borderBottomColor: '#F3EDF6', 
        },
        headerTitle: () => (
          <View style={{ width: 250}}>
              <Text>Registro de reporte de salud</Text>
          </View>
        ),
      }}
    />
  </SaludStack.Navigator>
  );
}

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
