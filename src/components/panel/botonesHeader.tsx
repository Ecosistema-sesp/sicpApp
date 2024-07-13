import React, { useRef, useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text, Modal, SafeAreaView, Animated, Alert, Easing } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Component from "react-native-paper/lib/typescript/components/List/ListItem";
import IniciarSesion from "../../screens/Inicio";
import { deleteAllUsers } from "../../../BaseDatos/DatosBasicos";

const getUsername = async () => {
    try {
      const username = await AsyncStorage.getItem('username');
      return username;
    } catch (error) {
      console.error(error);
    }
  };
  
const BtnHeaderScreen: React.FC<{ menuOptions: { [x: string]: any; value: string, text: string }[] }> = ({ menuOptions }) => {
    const navigation = useNavigation();
    const [visible, setVisible] = useState(false);
    const scale = useRef(new Animated.Value(0)).current;
    const handleLogout = async () => {
        deleteAllUsers();
        await AsyncStorage.removeItem('authToken');
        navigation.navigate('IniciarSesion');
    };
    
    const handleMenuOption = (value: any) => {
        const selectedOption = menuOptions.find(option => option.value === value);
        if (selectedOption) {
            selectedOption.action(navigation);
        }
    }
    

    function resizeBox(to: number){
        to === 1 && setVisible(true);
        Animated.timing(scale, {
            toValue: to,
            useNativeDriver: true,
            duration: 200,
            easing: Easing.linear,            
        }).start(() => to === 0 && setVisible(false)); 
    }

    return (

        <View style={styles.cerrarsesion}>

            <TouchableOpacity style={styles.botoncerrar} onPress={handleLogout}>
                <Icon name="log-out-outline" size={28} color="#00467E" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.botonbuscar}>
                <Icon name="search-outline" size={26} color="#00467E" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.botonpuntitos} onPress={() => resizeBox(1)}>
                <Icon name="ellipsis-vertical" size={26} color="#00467E" />
                <Modal transparent visible={visible}>
                    <SafeAreaView style={{flex: 1}} onTouchStart={() => setVisible(true)}>
                        <Animated.View style={styles.popup}>
                            {menuOptions.map(option => (
                                <TouchableOpacity style={styles.opciones} key={option.value} onPress={option.action}>
                                    <Text style={styles.popuptext}>{option.text}</Text>
                                </TouchableOpacity>
                            ))}
                        </Animated.View>
                    </SafeAreaView>
                </Modal>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    popup: {
        borderRadius: 8,
        borderColor: '#E6E5E3',
        borderWidth: 1,
        backgroundColor: '#FFF', 
        paddingHorizontal: 14,
        position: 'absolute',
        top: 60,
        right: 5,
        paddingTop: 10,
        paddingBottom: 10,
    },
    popuptext: {
        fontSize: 14,
        fontWeight: '500',
        color: 'black'
    },
    opciones: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
    },
    cerrarsesion: {
        minHeight: 20,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
    },
    botoncerrar: {
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 60,
        margin: 0,
    },
    botonbuscar: {
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        width: 55,
        height: 60,
        margin: 0,
    },
    botonpuntitos: {
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        width: 20,
        height: 60,
        margin: 0,
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        backgroundColor: "#fff",
        marginVertical: 0,
        marginHorizontal: 0,
    },    
})

export default BtnHeaderScreen;
