import React from 'react';
import { TextInput, StyleSheet, View, Text } from 'react-native';

interface PlacaProps {
    onChangeText: (text: string) => void;
}

const Placa: React.FC<PlacaProps> = ({onChangeText}) => {
  return (
      <View>
      <Text style={styles.texto}>
        Placa:
      </Text>
      <TextInput
          style={styles.input}
          autoCapitalize='characters'
          onChangeText={(text) => {
              const upperCaseText = text.replace(/[^A-Z0-9]/g, '');
              onChangeText(upperCaseText.trim());
          }}
      />
      </View>
  );
};

const styles = StyleSheet.create({
    input: {
        height: 48,
        fontSize: 17,
        color: '#5A87C6',
        fontWeight: '400',
        borderColor: '#CED4DA',
        borderWidth: 1,
        marginBottom: 10,
        borderRadius: 7,
        paddingLeft: 15,
      },
      texto: {
        color: '#00447C',
        marginBottom: 5,
        fontWeight: '500',
        fontSize: 16,
      },
});

export default Placa;
