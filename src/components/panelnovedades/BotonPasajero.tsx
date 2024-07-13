import { useNavigation, } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
  
export type StackNavigatorParams = {
    IniciarSesion: undefined;
    Panel: undefined;
    Panelesquema: undefined;
    novedadPasajero: { desdePanelEsquema: boolean; id: any };
    resumenPasajero: {id:any}
  };
  
  
  const BotonPasajero = () => {
    const navigation = useNavigation<NativeStackNavigationProp<StackNavigatorParams, 'novedadPasajero'>>();
  
    const BotonFlotanteTocado = () => {
        navigation.navigate("novedadPasajero", {desdePanelEsquema:false, id: ''});
    }    

    return (
        <View style={styles.container}>
        <TouchableOpacity
            style={styles.botonpasajero}
            onPress={BotonFlotanteTocado}
        >
            <Icon name="people-outline" size={80} color="#00447C" style={styles.icono} />
        </TouchableOpacity>
        <Text>Pasajero adicional</Text>
    </View>
    );
  }
   

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: 120,
        height: 100,
        marginStart: 20,
        marginEnd: 20,
        marginTop: 20, 
    },
    botonpasajero: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        width: 120,
        height: 60,
        borderColor: '#00447C',
    },
    icono: {
        marginStart: 2,
        marginEnd: 2,
        marginRight: 10,
        marginLeft: 10, 
    }
});


export default BotonPasajero