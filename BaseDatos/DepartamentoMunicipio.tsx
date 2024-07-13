import SQLite from 'react-native-sqlite-storage';

let db = SQLite.openDatabase({name: 'my.db', location: 'default'}, () => {}, (error) => {console.log(error);});


export const createDepartamentoTable = () => {
  db.transaction((tx) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS Departamento (id_departamento INTEGER PRIMARY KEY, nombre_departamento TEXT, pais INTEGER)',
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

export const insertDataIntoDepartamento = (data:any) => {
  db.transaction((tx) => {
    data.forEach((item:any) => {
      tx.executeSql(
        'SELECT * FROM Departamento WHERE id_departamento = ?',
        [item.id_departamento],
        (tx, results) => {
          if (results.rows.length === 0) {
            tx.executeSql(
              'INSERT INTO Departamento (id_departamento, nombre_departamento, pais) VALUES (?, ?, ?)',
              [item.id_departamento, item.nombre_departamento, item.pais],
              (tx, results) => {
                console.log('Datos insertados con éxito');
              },
              (error) => {
                console.log('Error al insertar datos: ', error);
              },
            );
          }
        },
        (error) => {
          console.log('Error al verificar los datos: ', error);
        },
      );
    });
  });
};


export const getDepartamentos = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM Departamento',
        [],
        (tx, results) => {
          const data: { id: number; nombre: string; precio: number }[] = [];
          for (let i = 0; i < results.rows.length; i++) {
            data.push(results.rows.item(i));
          }
          resolve(data);
        },
        (error) => {
          console.log('Error al obtener los datos: ', error);
          reject(error);
        },
      );
    });
  });
};


export const createMunicipioTable = () =>{
  db.transaction((tx) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS Municipios (id_municipio INTEGER PRIMARY KEY, nombre_municipio TEXT, departamento INTEGER)',
      [],
      (tx, results) => {
        console.log('tabla creada con éxito');
      },
      (error)=> {
        console.log('Error al crear la tabla: ', error);
      },
    );
  });
};

export const insertDataIntoMunicipio = (data:any) => {
  db.transaction((tx) => {
    data.forEach((item:any) => {
      tx.executeSql(
        'SELECT * FROM Municipios WHERE id_municipio = ?',
        [item.id_municipio],
        (tx, results) => {
          if (results.rows.length === 0) {
            tx.executeSql(
              'INSERT INTO Municipios (id_municipio, nombre_municipio, departamento) VALUES (?, ?, ?)',
              [item.id_municipio, item.nombre_municipio, item.departamento],
              (tx, results) => {
                console.log('Datos insertados con éxito');
              },
              (error) => {
                console.log('Error al insertar datos: ', error);
              },
            );
          }
        },
        (error) => {
          console.log('Error al verificar los datos: ', error);
        },
      );
    });
  });
};

export const getMunicipio = (id_departamento: number) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM Municipios WHERE departamento = ?',
        [id_departamento],
        (tx, results) => {
          const data: { id: number; nombre: string; precio: number }[] = [];
          for (let i = 0; i < results.rows.length; i++) {
            data.push(results.rows.item(i));
          }
          resolve(data);
        },
        (error) => {
          console.log('Error al obtener los datos: ', error);
          reject(error);
        },
      );
    });
  });
};
