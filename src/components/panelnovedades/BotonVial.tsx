import { useNavigation, } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
  
export type StackNavigatorParams = {
    IniciarSesion: undefined;
    Panel: undefined;
    PanelNovedades: undefined;
    novedadVial: { desdePanelNovedades: boolean, id: any };
    resumenVial: { id: any };
  };
  
  
  const BotonVial = () => {
    const navigation = useNavigation<NativeStackNavigationProp<StackNavigatorParams, 'novedadVial'>>();
  
    const BotonFlotanteTocado = () => {
        navigation.navigate("novedadVial", {id: '', desdePanelNovedades : false});
    }    

    return (
        <View style={styles.container}>
        <TouchableOpacity
            style={styles.botonVial}
            onPress={BotonFlotanteTocado}
        >
            <Icon name="road" size={80} color="#00447C" style={styles.icono} />
        </TouchableOpacity>
        <Text>Vial</Text>
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
    botonVial: {
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


export default BotonVial