import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';


interface BotonincrementoProps {
    onPress: any;
    title : String;
}

const BotonMasMenos = ({ onPress, title }: BotonincrementoProps) => (
  <TouchableOpacity onPress={onPress} style={styles.button}>
    <Text style={styles.text}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#5A87C6',
    padding: 10,
    alignItems: 'center', 
    borderRadius: 5, 
    marginBottom: 10,
    marginLeft: 1,
    marginRight: 1,
  },
  text: {
    color: 'white', 
    fontSize: 16, 
  },
});

export default BotonMasMenos;