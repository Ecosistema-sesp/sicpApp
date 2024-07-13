import React, { useState, useEffect } from 'react';
import { FormikValues, useFormik} from 'formik';
import { View, StyleSheet, Text } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation, RouteProp, useRoute, NavigationProp } from "@react-navigation/native";
import axios from 'axios';
import { StackNavigatorParams as localStackNavigatorParams} from '../../panelnovedades/BotonVehiculo';
import { Container } from '../../inicio/Contenedor';
import { InfoContainer, TituloContainer } from '../TitulosContainer';
import NombreApellido from '../ObtenerUsuario';
import FechaHora from '../FechaActual';
import DepartamentoMunicipio from '../DepartamentoMunicipio';
import NovedadCategoria from './NovedadCategoria';
import Placa from './placa';
import Ubicacion from '../Ubicacion';
import { BotonSubmit } from '../../../navegacion/BotonSubmit';


type RootStackParamList = {
  Panel: undefined;
};

type DhVehiculoForm = {
  id: any;
};

const DhVehiculoForm = () => {

  const [userId, setUserId] = useState<number | null>(null);
  const [userRol, setUserRolId] = useState(2)
  const [fechaInicio, setFechaInicio] = useState('');
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<localStackNavigatorParams, 'novedadVehiculo'>>();
  const { id } = route.params;


  const vehiculo = useFormik({
    
    initialValues:{
      usuario_sicp: userId || '',
      rol_usuariosicp: userRol,
      fecha_creacion: new Date(),
      fecha_actualizacion: new Date(),
      fecha_inicio: '',
      departamento_inicio: '',
      municipio_inicio: '',
      ubicacion_inicio: '',
      desplazamiento: '',
      tipo_novedad: '',
      caracteristica_novedad: '',
      placa: '',
      tipo_reporte: 5,
    },
    onSubmit: async (values: FormikValues) => {
      try {
        await axios.post('http://ecosistemasesp.unp.gov.co/sicp/api/vehiculo/', values);
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
      vehiculo.setValues({
        ...vehiculo.values,
        usuario_sicp: userId,
      });
    }
  }, [userId]);

  useEffect(() => {
    if (id) {
      axios.get(`http://ecosistemasesp.unp.gov.co/sicp/api/vehiculo/${id}/`)
        .then(response => {
          vehiculo.setValues(response.data);
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

  const updatePlaca = (newPlaca: string) => {
    vehiculo.setFieldValue('placa', newPlaca);
  };
  
    return (
    <Container> 
      <TituloContainer
      iconName="person-circle-sharp"
      titulo="Persona y rol "
      />
      <NombreApellido setUserId={setUserId} desplazamiento={vehiculo} />
      <TituloContainer
          iconName="chevron-forward-circle"
          titulo="Datos de ubicación"
        />
        <FechaHora variables={{fecha : fechaInicio}} desplazamiento={vehiculo} tipo='fecha_inicio'/>
        <Ubicacion desplazamiento={vehiculo} tipo='inicio' />
        <DepartamentoMunicipio desplazamiento={vehiculo} tipo='inicio' />
        <TituloContainer
          iconName="chevron-forward-circle"
          titulo="Reporte del vehículo"
        />
        <NovedadCategoria vehiculo={vehiculo} />
        <Placa onChangeText={updatePlaca} />  
        <BotonSubmit handleSubmit={() => vehiculo.handleSubmit()} buttonText="Registrar Novedad" />

    </Container>
    )

}




const VehiculoStack = createStackNavigator();
export default function VehiculoStackScreen() {
  const route = useRoute<RouteProp<localStackNavigatorParams, 'novedadVehiculo'>>();
  const desdePanelNovedades = route.params?.desdePanelNovedades;
  const id = route.params?.id;
  return (
  <VehiculoStack.Navigator>
    <VehiculoStack.Screen 
      name="DhvehiculoForm" 
      component={DhVehiculoForm} 
      initialParams={{ desdePanelNovedades: desdePanelNovedades, id: id }}
      options={{ 
        headerStyle: {
          backgroundColor: '#F4F2F3',
          borderBottomWidth: 1,
          borderBottomColor: '#F3EDF6', 
        },
        headerTitle: () => (
          <View style={{ width: 250}}>
              <Text>Registro de vehículo</Text>
          </View>
        ),
      }}
    />
  </VehiculoStack.Navigator>
  );
}