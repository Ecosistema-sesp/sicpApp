import React, { useState, useEffect } from 'react';
import { TextInput, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SQLite from 'react-native-sqlite-storage';

let db = SQLite.openDatabase({name: 'my.db', location: 'default'}, () => {}, (error) => {console.log(error);});

interface NombreApellidoProps {
setUserId: (id: number) => void;
desplazamiento : any
}

interface UserData {
first_name: string;
last_name: string;
id: number;
}

const NombreApellido = ({ setUserId, desplazamiento }: NombreApellidoProps) => {
const [userData, setUserData] = useState<UserData | null>(null);
const [nombreUsuario, setNombreUsuario] = useState('');

useEffect(() => {
  fetchAndHandleUrl();
}, []);   

useEffect(() => {
  if (userData) {
    setNombreUsuario(`${userData.first_name} ${userData.last_name}`);
    setUserId(userData.id);
    desplazamiento.setFieldValue('id', userData.id)
  }
}, [userData]);

async function  fetchAndHandleUrl() {
  try {
    const id = await AsyncStorage.getItem('username');
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM DatosUsuario WHERE username = ?',
        [id],
        (_, resultSet) => {console.log(tx)
          if (resultSet.rows.length > 0) {
            const user = resultSet.rows.item(0);
            setUserData(user);
          }
        },
        (_, error) => {
          console.error(error);
        }
      );
    });
  } catch (error) {
    console.error(error);
  }
}

  return (
    <View style={styles.contenedor}>
      <TextInput
        style={styles.input}
        placeholder='Nombre(s) y apellido(s)'
        value={nombreUsuario}
        editable={false}
        onFocus={() => {
          setNombreUsuario('');
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  
  contenedor: {
    paddingBottom: 10,
  },

  input: {
    height: 55,
    fontSize: 17,
    color: '#5A87C6',
    fontWeight: '400',
    borderColor: '#CED4DA',
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 7,
    paddingLeft: 15,
  },
});

export default NombreApellido;
