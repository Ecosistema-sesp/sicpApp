import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

const BotonFlotante2 = () => {

    const navigation = useNavigation();
  
    const BotonFlotante2Tocado = () => {
      navigation.navigate("PanelNovedades2");
    }    
  
    return (
      <View style={styles.botonflotante}>
        <TouchableOpacity onPress={BotonFlotante2Tocado}>
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
  
  export default BotonFlotante2;
  
  