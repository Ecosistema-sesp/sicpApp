import React, { useEffect } from 'react';
import { View, Text, StyleSheet, BackHandler} from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import { HeaderButtons } from'react-navigation-header-buttons';

import BtnHeaderScreen from '../components/panel/botonesHeader';
import { Container } from "../components/inicio/Contenedor";
import DirectorioForm from "../components/directoriotelefonico";

const DirectorioStack = createStackNavigator();

const Directorio = () => {
  useEffect(() => {
    const backAction = () => {
      BackHandler.exitApp();
      return true;
    };
  
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove(); 
  }, []);

  return (
    <Container>
      <View style={styles.container}>
        <Text>Directorio</Text>
        <DirectorioForm />
      </View>
    </Container>
  );
};

function DirectorioStackScreen() {
  return (
    <DirectorioStack.Navigator>
      <DirectorioStack.Screen 
        name="DirectorioScreen" 
        component={Directorio} 
        options={{ 
          headerLeft: () => null,
          headerRight: () => (
            <HeaderButtons>
              <BtnHeaderScreen menuOptions={[
                { value: 'option1', text: 'Opción 1 para Directorio' },
                { value: 'option2', text: 'Opción 2 para Directorio' },
              ]} />
            </HeaderButtons>
          ),
          headerStyle: {
            backgroundColor: '#FFF',
            borderBottomWidth: 1,
            borderBottomColor: '#E6E5E3',
          },
          headerTitle: () => (
            <View>
              <Text style={styles.tituloDirectorio}>Directorio</Text>
            </View>
          ),
        }}
      />
    </DirectorioStack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  tituloDirectorio: {
    fontSize: 20,
    textAlign: 'left',
    fontWeight: '500',
    marginBottom: 5,
    color: '#02467E'
  }
});

export default DirectorioStackScreen;