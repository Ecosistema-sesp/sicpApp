import React, { useState, useEffect } from 'react';
import { FormikValues, useFormik} from 'formik';
import { View, StyleSheet, Text } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation, RouteProp, useRoute, NavigationProp } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { StackNavigatorParams as localStackNavigatorParams} from '../../panelnovedades/BotonInicioMision';
import { Container } from '../../inicio/Contenedor';
import NombreApellido from '../ObtenerUsuario';
import { BotonSubmit } from '../../../navegacion/BotonSubmit';
import { insertarDatosComision, enviarDatosTablaTemporal } from '../../../../BaseDatos/ReporteComision';
import NetInfo from "@react-native-community/netinfo";
import { InfoContainer, TituloContainer } from '../TitulosContainer';
import FechaHora from '../FechaActual';
import Ubicacion from '../Ubicacion';
import DepartamentoMunicipio from '../DepartamentoMunicipio';
import DatoIngreso from '../datoIngreso';
import Cantidad from '../pasajero/Cantidad';
import FinComision from './finComision';
import { obtenerIdUsuario } from '../../../../BaseDatos/DatosBasicos';

type RootStackParamList = {
  Panel: undefined;
};

type DhInicioComisionForm = {
  desdePanelEsquema: boolean;
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

const DhInicioComisionForm = () => {
  const route = useRoute<RouteProp<localStackNavigatorParams, 'novedadInicioMision'>>();
  const { desdePanelEsquema, id } = route.params;
  const [fechaInicio, setFechaInicio] = useState('');
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [userId, setUserId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  
  const comision = useFormik({
    initialValues:{
      usuario_sicp: userId,
      fecha_creacion: new Date(),
      fecha_actualizacion: new Date(),
      fecha_inicio: '',
      fecha_fin: new Date(),
      departamento_inicio: 0,
      municipio_inicio: 0,
      ubicacion_inicio: '',
      ubicacion_fin: '',
      departamento_fin: 2,
      municipio_fin: 1002,
      vereda_cinicio: '',
      vereda_cfin: '',
      numero_ppinician: 0,
      numero_ppterminan: 0, 
      numero_pmiinician: 0,
      numero_pmiterminan: 0,
      kilometraje_inicial: 0,
      kilometraje_final: 0,
      observacion: '',
      tipo_reporte: 1,
    },
    onSubmit: async (values: FormikValues) => {
      try {
        await axios.post('http://ecosistemasesp.unp.gov.co/sicp/api/comision/', values);
        insertarDatosComision(values);
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
        enviarDatosTablaTemporal();
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
      comision.setFieldValue('usuario_sicp', userId);
    }
  }, [userId]);


  if (loading) {  
    return null;
  }

  return (
    <Container>
         
    {desdePanelEsquema ? (
      <>
        <FinComision Id={id} comision={comision} />
      </>
    ) : (
      <>
        <TituloContainer
          iconName="person-circle-sharp"
          titulo="Persona que registra"
        />
        
        <NombreApellido setUserId={setUserId} desplazamiento={comision} />

        <TituloContainer
          iconName="chevron-forward-circle"
          titulo="Datos y ubicación de inicio"
        />

        <FechaHora variables={{fecha : fechaInicio}} desplazamiento={comision} tipo='fecha_inicio'/>
        <Ubicacion desplazamiento={comision} tipo='inicio' />
        <DepartamentoMunicipio desplazamiento={comision} tipo='inicio' />
        <DatoIngreso label="Vereda, corregimimiento u otro" onChangeText={text => comision.setFieldValue('vereda_cinicio', text)} />
        <View style={styles.cantidad}>
            <View style={styles.fila}>
                <Text style={styles.texto}>
                    persona de protección:
                </Text>
                <Cantidad pasajero={comision} valor= {20} onValueChange={(value) => { comision.setFieldValue('numero_ppinician', value) }} />
            </View>
            <View style={styles.fila}>
                <Text style={styles.texto}>
                    Personas PMI:
                </Text>
                <Cantidad pasajero={comision} valor= {20} onValueChange={(value) => { comision.setFieldValue('numero_pmiinician', value) }}  />
            </View>
        </View>
        <View style={styles.cantidad}>
            <View style={styles.fila}>
                <Text style={styles.texto}>
                    Kilometro inicial vehículo:
                </Text>
                <Cantidad pasajero={comision} valor= {1000000} onValueChange={(value) => { comision.setFieldValue('kilometraje_inicial', value) }} />
            </View>
        </View>
        <InfoContainer />
        <BotonSubmit handleSubmit={() => comision.handleSubmit()} buttonText="Iniciar comisión" />
      </>
    )}
    </Container>
  )
}

const InicioMisionStack = createStackNavigator();
export default function InicioMisionStackScreen() {
  const route = useRoute<RouteProp<localStackNavigatorParams, 'novedadInicioMision'>>();
  const desdePanelEsquema = route.params?.desdePanelEsquema;
  const id = route.params?.id;
  return (
  <InicioMisionStack.Navigator>
    <InicioMisionStack.Screen 
      name="DhInicioMisionForm" 
      component={DhInicioComisionForm} 
      initialParams={{ desdePanelEsquema: desdePanelEsquema, id: id }}
      options={{ 
        headerStyle: {
          backgroundColor: '#F4F2F3',
          borderBottomWidth: 1,
          borderBottomColor: '#F3EDF6', 
        },
        headerTitle: () => (
          <View style={{ width: 250}}>
              <Text>Registro de inicio de comisión</Text>
          </View>
        ),
      }}
    />
  </InicioMisionStack.Navigator>
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
