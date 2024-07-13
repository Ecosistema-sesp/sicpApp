import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, KeyboardAvoidingView, Platform, Keyboard, View, BackHandler } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Container } from "../components/inicio/Contenedor";
import Escudo from "../components/inicio/Escudo";
import Unp from "../components/inicio/Titulos";
import Credenciales from "../components/inicio/Inputs";
import BtnIniciarSesion from "../components/inicio/BotonIniciarSesion";
import { DialButton } from "../navegacion/botonLineaVida";
import { createDepartamentoTable, insertDataIntoDepartamento, createMunicipioTable, insertDataIntoMunicipio } from "../../BaseDatos/DepartamentoMunicipio";

// función para iniciar sesión 
const IniciarSesion = () => {
  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const navigation = useNavigation();


// useEffect para salir de la aplicacion si se aprieta el boton atras del dispositivo movil
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

  // useEffect que verifica si el token está almacebnado en la memoria asincronica del dispositivo para redireccionar al panel sin iniciar sesión
  useEffect(() => {
    const checkToken = async () => {
        const token = await AsyncStorage.getItem('authToken');
        if (token) {
            navigation.navigate("Panel");
        } else {
            setLoading(false);
        }
    };

    checkToken();
  }, []);


// useEffect para el guardado de los datos básicos de la persona de protección

// useEffect para guardar los departamentos y municipios por primera vez en el dispositivo
  useEffect(() => {
    createDepartamentoTable();
    fetch('http://ecosistemasesp.unp.gov.co/sicp/api/departamento/')
      .then(response => response.json())
      .then(data => {
        insertDataIntoDepartamento(data);
      })
      .catch(error => console.error(error));
  }, []);

  useEffect(()=> {
    createMunicipioTable();
    fetch('http://ecosistemasesp.unp.gov.co/sicp/api/municipio/')
    .then(response => response.json())
    .then(data => {
      insertDataIntoMunicipio(data);
    })
    .catch(error => console.error(error));
  }, []);


  // useEffect para guardar los datos de los eportes del vehículo 

  const handleLogin = async() => {
    if (username === "" || password === "") {
      console.log("Por favor, rellena todos los campos.");
    } else {
      const response = await fetch('http://ecosistemasesp.unp.gov.co/api/token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
          
    }),
    })
    const data = await response.json();

    if (data.access) {
      await AsyncStorage.setItem('authToken', data.access);
      await AsyncStorage.setItem('username', username); 
      const storedToken = await AsyncStorage.getItem('authToken');
      navigation.navigate("Panel");
      
    } else {
      console.log('Error al iniciar sesión');
    }
  };
  }

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />; 
  }
  
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Container>
        <Unp />
        <Escudo />
        <Credenciales setUsername={setUsername} setPassword={setPassword} />
        <BtnIniciarSesion onPress={handleLogin} />
      </Container>
      <DialButton />
    </KeyboardAvoidingView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default IniciarSesion;
