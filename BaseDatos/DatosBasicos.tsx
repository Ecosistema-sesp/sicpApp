import SQLite from 'react-native-sqlite-storage';

let db = SQLite.openDatabase({name: 'my.db', location: 'default'}, () => {}, (error) => {console.log(error);});

export const createDatosBasico = () => {
    db.transaction((tx) => {
        tx.executeSql(
            'CREATE TABLE IF NOT EXIST DatosBasico(id INTEGER PRYMARY KEY, first_name TEXT, last_name TEXT, username TEXT, email TEXT, numero_isolicitante TEXT, tipo_identificacion INTEGER, estado_pproteccion INTEGER, genero INTEGER, estado_lpproteccion INTEGER, cronos INTEGER)',
            [],
            (tx, results) => {
                console.log('Tabla creada con éxito');
            },
            (error) => {
                    console.log('Error al crear la tabla: ', error);
            },
        );
    });
};


export const DatosUsuario = () => {
    db.transaction((tx)=> {
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS DatosUsuario(id INTEGER PRIMARY KEY, first_name TEXT, last_name TEXT, username TEXT, email TEXT)',
            [],
            (tx, resulst) => {
                console.log('tabla DatosBasicos creada con éxito');
            },
            (error) => {
                console.log('Error al crear la tabla DatosUsuario: ', error);
            },
        );
    });
};

export const insertarDatosUsuario = (usuario:any) => {
  db.transaction((tx) => {
    tx.executeSql(
      'INSERT INTO DatosUsuario (id, first_name, last_name, username, email) VALUES (?, ?, ?, ?, ?)',
      [usuario.id, usuario.first_name, usuario.last_name, usuario.username, usuario.email],
      (tx, results) => {
        console.log('Datos insertados con éxito');
      },
      (error) => {
        console.log('Error al insertar datos: ', error);
        // Limpia la tabla si ocurre un error
        tx.executeSql(
          'DELETE FROM DatosUsuario',
          [],
          () => {
            console.log('Tabla limpiada con éxito');
          },
          (error) => {
            console.log('Error al limpiar la tabla: ', error);
          },
        );
      },
    );
  });
};

  
  export const getUserByUsername = (username:any) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM DatosUsuario WHERE username = ?',
          [username],
          (tx, results) => {
            if (results.rows.length > 0) {
              resolve(results.rows.item(0));
            } else {
              resolve(null);
            }
          },
          (error) => {
            console.log('Error al obtener los datos: ', error);
            reject(error);
          },
        );
      });
    });
  };
  
  export const deleteAllUsers = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM DatosUsuario',
        [],
        (_, results) => {
          console.log('Todos los datos de usuario han sido eliminados con éxito');
        },
        (_, error) => {
          console.log('Error al eliminar los datos de usuario: ', error);
        },
      );
    });
  };

  export const obtenerIdUsuario = (username:any) => {
    let userId = null;
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT id FROM DatosUsuario WHERE username = ?',
        [username],
        (tx, results) => {
          if (results.rows.length > 0) {
            userId = results.rows.item(0).id;
            console.log('ID del usuario obtenido con éxito: ', userId);
          } else {
            console.log('No se encontró ningún usuario con ese nombre de usuario');
          }
        },
        (error) => {
          console.log('Error al obtener el ID del usuario: ', error);
        },
      );
    });
    return userId;
  };
  