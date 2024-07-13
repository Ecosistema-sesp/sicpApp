import SQLite from 'react-native-sqlite-storage';
import axios from 'axios';


let db = SQLite.openDatabase({name: 'my.db', location: 'default'}, () => {}, (error) => {console.log(error);});

export const crearTablaComision = () => {
    db.transaction((tx) => {
      tx.executeSql(`
        CREATE TABLE IF NOT EXISTS comision (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          usuario_sicp INTEGER,
          fecha_creacion DATE,
          fecha_actualizacion DATE,
          fecha_inicio DATE,
          fecha_fin DATE,
          departamento_inicio INTEGER,
          munipio_inicio INTEGER,
          ubicacion_inicio TEXT,
          ubicacion_fin TEXT,
          departamento_fin INTEGER,
          munipio_fin INTEGER,
          vereda_cinicio TEXT,
          vereda_cfin TEXT,
          numero_ppinician INTEGER,
          numero_ppterminan INTEGER,
          numero_pmiinician INTEGER,
          numero_pmiterminan INTEGER,
          kilometraje_inicial INTEGER,
          kilometraje_final INTEGER,
          cronos INTEGER,
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

  export const crearTablaComisionTemporal = () => {
    db.transaction((tx) => {
      tx.executeSql(`
        CREATE TABLE IF NOT EXISTS comisionTemporal (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          usuario_sicp INTEGER,
          fecha_creacion DATE,
          fecha_actualizacion DATE,
          fecha_inicio DATE,
          fecha_fin DATE,
          departamento_inicio INTEGER,
          munipio_inicio INTEGER,
          ubicacion_inicio TEXT,
          ubicacion_fin TEXT,
          departamento_fin INTEGER,
          munipio_fin INTEGER,
          vereda_cinicio TEXT,
          vereda_cfin TEXT,
          numero_ppinician INTEGER,
          numero_ppterminan INTEGER,
          numero_pmiinician INTEGER,
          numero_pmiterminan INTEGER,
          kilometraje_inicial INTEGER,
          kilometraje_final INTEGER,
          cronos INTEGER,
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
  
  export const insertarDatosComision = (datos: any) => {
    db.transaction((tx) => {
      const {
        usuario_sicp,
        fecha_creacion,
        fecha_actualizacion,
        fecha_inicio,
        fecha_fin,
        departamento_inicio,
        munipio_inicio,
        ubicacion_inicio,
        ubicacion_fin,
        departamento_fin,
        munipio_fin,
        vereda_cinicio,
        vereda_cfin,
        numero_ppinician,
        numero_ppterminan,
        numero_pmiinician,
        numero_pmiterminan,
        kilometraje_inicial,
        kilometraje_final,
        cronos,
        observacion
      } = datos;
  
      const query = `
        INSERT INTO comision (
          usuario_sicp,
          fecha_creacion,
          fecha_actualizacion,
          fecha_inicio,
          fecha_fin,
          departamento_inicio,
          munipio_inicio,
          ubicacion_inicio,
          ubicacion_fin,
          departamento_fin,
          munipio_fin,
          vereda_cinicio,
          vereda_cfin,
          numero_ppinician,
          numero_ppterminan,
          numero_pmiinician,
          numero_pmiterminan,
          kilometraje_inicial,
          kilometraje_final,
          cronos,
          observacion
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
  
      // Insertar datos en la tabla 'comision'
      tx.executeSql(query, [usuario_sicp, fecha_creacion, fecha_actualizacion, fecha_inicio, fecha_fin, departamento_inicio, munipio_inicio, ubicacion_inicio, ubicacion_fin, departamento_fin, munipio_fin, vereda_cinicio, vereda_cfin, numero_ppinician, numero_ppterminan, numero_pmiinician, numero_pmiterminan, kilometraje_inicial, kilometraje_final, cronos, observacion], 
      (_, results) => {
        console.log('Datos insertados en la tabla comision con éxito');
      },
      (_, error) => {
        console.log('Error al insertar datos en la tabla comision: ', error);
      });
    });
  };


  export const enviarDatosTablaTemporal = async () => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM comisionTemporal',
        [],
        async (_, resultSet) => {
          for (let i = 0; i < resultSet.rows.length; i++) {
            const dato = resultSet.rows.item(i);
            // Crea un nuevo objeto que excluya el 'id'
            const { id, ...datoSinId } = dato;
            try {
              await axios.post('http://ecosistemasesp.unp.gov.co/sicp/api/comision/', datoSinId);
              tx.executeSql(
                'DELETE FROM comisionTemporal WHERE id = ?',
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