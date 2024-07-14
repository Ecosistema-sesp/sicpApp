import { useNavigation, } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
  
export type StackNavigatorParams = {
    IniciarSesion: undefined;
    Panel: undefined;
    PanelNovedades: undefined;
    NovedadOtro: { desdePanelNovedades: boolean; id: any };
    ResumenOtro: {id : any};
  };
  
  
  const BotonOtro = () => {
    const navigation = useNavigation<NativeStackNavigationProp<StackNavigatorParams, 'NovedadOtro'>>();
  
    const BotonFlotanteTocado = () => {
        navigation.navigate("NovedadOtro", {desdePanelNovedades:false, id: '0'});
    }    

    return (
        <View style={styles.container}>
        <TouchableOpacity
            style={styles.botondesplazamiento}
            onPress={BotonFlotanteTocado}
        >
            <Icon name="arrow-redo" size={70} color="#00447C" style={styles.icono} />
        </TouchableOpacity>
        <Text>Otro</Text>
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
    botondesplazamiento: {
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


export default BotonOtro