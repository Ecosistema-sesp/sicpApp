import React, { useState, useEffect } from 'react';
import { FormikValues, useFormik} from 'formik';
import { View, StyleSheet, Text } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation, RouteProp, useRoute, NavigationProp } from "@react-navigation/native";
import axios from 'axios';
import { StackNavigatorParams as localStackNavigatorParams} from '../../panelnovedades/BotonVial';
import { Container } from '../../inicio/Contenedor';
import { InfoContainer, TituloContainer } from '../TitulosContainer';
import NombreApellido from '../ObtenerUsuario';
import FechaHora from '../FechaActual';
import DepartamentoMunicipio from '../DepartamentoMunicipio';
import Ubicacion from '../Ubicacion';
import { BotonSubmit } from '../../../navegacion/BotonSubmit';
import NovedadCategoriaVial from './TipoVial';


type RootStackParamList = {
  Panel: undefined;
};

type DhVialForm = {
  id: any;
};

const DhVialForm = () => {

  const [userId, setUserId] = useState<number | null>(null);
  const [userRol, setUserRolId] = useState(2)
  const [fechaInicio, setFechaInicio] = useState('');
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<localStackNavigatorParams, 'novedadVial'>>();
  const { id } = route.params;


  const vial = useFormik({
    
    initialValues:{
      usuario_sicp: userId || '',
      fecha_creacion: new Date(),
      fecha_actualizacion: new Date(),
      fecha_inicio: '',
      departamento_inicio: '',
      municipio_inicio: '',
      ubicacion_inicio: '',
      desplazamiento: '',
      tipo_novedad: '',
      tipo_reporte: 6,
    },
    
    onSubmit: async (values: FormikValues) => {
      try {
        await axios.post('http://ecosistemasesp.unp.gov.co/sicp/api/vial/', values);
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
      vial.setValues({
        ...vial.values,
        usuario_sicp: userId,
      });
    }
  }, [userId]);

  useEffect(() => {
    if (id) {
      axios.get(`http://ecosistemasesp.unp.gov.co/sicp/api/vial/${id}/`)
        .then(response => {
          vial.setValues(response.data);
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

    return (
    <Container> 
      <TituloContainer
      iconName="person-circle-sharp"
      titulo="Persona y rol "
      />
      <NombreApellido setUserId={setUserId} desplazamiento={vial} />
      <TituloContainer
          iconName="chevron-forward-circle"
          titulo="Datos de ubicación"
        />
        <FechaHora variables={{fecha : fechaInicio}} desplazamiento={vial} tipo='fecha_inicio'/>
        <Ubicacion desplazamiento={vial} tipo='inicio' />
        <DepartamentoMunicipio desplazamiento={vial} tipo='inicio' />
        <TituloContainer
          iconName="chevron-forward-circle"
          titulo="Reporte del vehículo"
        />
        <NovedadCategoriaVial vial={vial} />
        <BotonSubmit handleSubmit={() => vial.handleSubmit()} buttonText="Registrar reporte" />

    </Container>
    )

}




const VialStack = createStackNavigator();
export default function VialStackScreen() {
  const route = useRoute<RouteProp<localStackNavigatorParams, 'novedadVial'>>();
  const desdePanelNovedades = route.params?.desdePanelNovedades;
  const id = route.params?.id;
  return (
  <VialStack.Navigator>
    <VialStack.Screen 
      name="DhvehiculoForm" 
      component={DhVialForm} 
      initialParams={{ desdePanelNovedades: desdePanelNovedades, id: id }}
      options={{ 
        headerStyle: {
          backgroundColor: '#F4F2F3',
          borderBottomWidth: 1,
          borderBottomColor: '#F3EDF6', 
        },
        headerTitle: () => (
          <View style={{ width: 250}}>
              <Text>Registro de vial</Text>
          </View>
        ),
      }}
    />
  </VialStack.Navigator>
  );
}