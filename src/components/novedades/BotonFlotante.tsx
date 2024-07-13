import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

const BotonFlotante = () => {

    const navigation = useNavigation();
  
    const BotonFlotanteTocado = () => {
      navigation.navigate("PanelNovedades");
    }    
  
    return (
      <View style={styles.botonflotante}>
        <TouchableOpacity onPress={BotonFlotanteTocado}>
          <Icon name="chatbubbles-outline" size={30} color="#FFF" />
        </TouchableOpacity>
      </View>
    )
  } 
  
  const styles = StyleSheet.create({
    botonflotante: {
      backgroundColor: '#5A87C6',
      width: 55,
      height: 55,
      borderRadius: 15,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      bottom: 15,
      right: 15,
    },
  });
  
  export default BotonFlotante;
  
  