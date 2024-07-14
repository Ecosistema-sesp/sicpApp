import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  ResumenInasistencia: {id : number};
  novedadInasistencia: { desdePanelNovedades: boolean, id : number };
};

export function useInasistencia() {
  const [inasistenciaData, setInasistenciaData] = useState<inasistencia | null>(null);
  const [id_reporte, setIdReporte] = useState<number | null>(null);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();


interface inasistencia {
  fecha_inicio: string;
  usuario_sicp: number;
  id_reporte : number;
  ubicacion_inicio: String;
  ubicacion_fin:String;
}

useEffect(() => {
  if (id_reporte === null) return;

  const fetchInasistencia = async () => {
    setInasistenciaData(null);
    setIdReporte(null);

    try {
      const response = await fetch(`http://ecosistemasesp.unp.gov.co/sicp/api/inasistencia/${id_reporte}`);
      const ApiInasistencia = await response.json();
      setInasistenciaData(ApiInasistencia);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  };
  fetchInasistencia();
}, [id_reporte]);

useEffect(() => {
    if (inasistenciaData) 
        {
          console.log(inasistenciaData.id_reporte)
          navigation.navigate('ResumenInasistencia', { id: inasistenciaData.id_reporte });
        }
}, [inasistenciaData]);

return setIdReporte;
}
