import SQLite from 'react-native-sqlite-storage';
import axios from 'axios';


let db = SQLite.openDatabase({name: 'my.db', location: 'default'}, () => {}, (error) => {console.log(error);});

export const crearTablaServicio = () => {
    db.transaction((tx) => {
      tx.executeSql(`
        CREATE TABLE IF NOT EXISTS servicio (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          usuario_sicp INTEGER,
          fecha_creacion DATE,
          fecha_actualizacion DATE,
          fecha_inicio DATE,
          fecha_fin DATE,
          ubicacion_inicio TEXT,
          ubicacion_fin TEXT,
          cronos INTEGER,
          comision INTEGER, 
          observacion TEXT
        )
      `, [], 
      (tx, results) => {
        console.log('Tabla creada con éxito');
      },
      (error) => {
        console.log('Error al crear la tabla: ', error);
      });
    });
  };

  export const crearTablaServicioTemporal = () => {
    db.transaction((tx) => {
      tx.executeSql(`
        CREATE TABLE IF NOT EXISTS servicioTemporal (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            usuario_sicp INTEGER,
            fecha_creacion DATE,
            fecha_actualizacion DATE,
            fecha_inicio DATE,
            fecha_fin DATE,
            ubicacion_inicio TEXT,
            ubicacion_fin TEXT,
            cronos INTEGER,
            comision INTEGER, 
            observacion TEXT
          )
      `, [], 
      (tx, results) => {
        console.log('Tabla creada con éxito');
      },
      (error) => {
        console.log('Error al crear la tabla: ', error);
      });
    });
  };
  
  export const insertarDatosServicio = (datos: any) => {
    db.transaction((tx) => {
      const {
        usuario_sicp,
        fecha_creacion,
        fecha_actualizacion,
        fecha_inicio,
        fecha_fin,
        ubicacion_inicio,
        ubicacion_fin,
        cronos,
        comision,
        observacion
      } = datos;
  
      const query = `
        INSERT INTO servicio (
          usuario_sicp,
          fecha_creacion,
          fecha_actualizacion,
          fecha_inicio,
          fecha_fin,
          ubicacion_inicio,
          ubicacion_fin,
          cronos,
          comision,
          observacion
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
  
      // Insertar datos en la tabla 'comision'
      tx.executeSql(query, [usuario_sicp, fecha_creacion, fecha_actualizacion, fecha_inicio, fecha_fin, ubicacion_inicio, ubicacion_fin, cronos, comision, observacion], 
      (_, results) => {
        console.log('Datos insertados en la tabla comision con éxito');
      },
      (_, error) => {
        console.log('Error al insertar datos en la tabla comision: ', error);
      });
    });
  };


  export const enviarDatosTablaTemporalServicio = async () => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM servicioTemporal',
        [],
        async (_, resultSet) => {
          for (let i = 0; i < resultSet.rows.length; i++) {
            const dato = resultSet.rows.item(i);
            // Crea un nuevo objeto que excluya el 'id'
            const { id, ...datoSinId } = dato;
            try {
              await axios.post('http://ecosistemasesp.unp.gov.co/sicp/api/servicio/', datoSinId);
              tx.executeSql(
                'DELETE FROM servicioTemporal WHERE id = ?',
                [id]
              );
            } catch (error) {
              console.error(error);
            }
          }
        },
        (_, error) => {
          console.error(error);
        }
      );
    });
  };