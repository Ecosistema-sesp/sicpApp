import React, { useState, useEffect } from 'react';
import { TextInput, View, StyleSheet, Text } from 'react-native';
import { toZonedTime, format } from 'date-fns-tz';

interface FechaHoraProps {
  variables: {
    fecha: string;
  };
  desplazamiento :any
  tipo: String

}
const FechaHora = ({ variables, desplazamiento, tipo }: FechaHoraProps) => {
  const [fecha, setFecha] = useState(variables.fecha);

  useEffect(() => {
    let output;
    if (variables.fecha) {
      output = variables.fecha;
    } else {
      const date = new Date();
      const timeZone = 'America/Bogota';
      const zonedDate = toZonedTime(date, timeZone);
      output = format(zonedDate,"yyyy-MM-dd'T'HH:mm:ss.SSSSSSxxx");
    }
    setFecha(output);
    desplazamiento.setFieldValue(tipo, output);
  }, [variables.fecha]);

  const fechaSplit = fecha ? fecha.split('T') : ['',''];

  let hora = fechaSplit[1] ? fechaSplit[1].split('.')[0] : 'No disponible';

  return (
    <View style={styles.date}>
      <View style={{width: '48%'}}>
        <Text style={styles.texto}>
          Fecha:
        </Text>
        <TextInput
          style={styles.input}
          placeholder='Fecha de inicio'
          value={fechaSplit[0]}
          editable={false}
        />
      </View>
      <View style={{width: '48%'}}>
        <Text style={styles.texto}>
          Hora:
        </Text>
        <TextInput
          style={styles.input}
          placeholder='Hora de inicio'
          value={hora}
          editable={false}  
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  date: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  texto: {
    color: '#00447C',
    marginBottom: 5,
    paddingLeft: 2,
    fontWeight: '500',
    fontSize: 16,
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

export default FechaHora;
