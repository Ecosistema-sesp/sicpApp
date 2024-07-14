import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  ResumenFinalizacion: {id : number};
  novedadFinalizacion: { desdePanelNovedades: boolean, id : number };
};

export function useFinalizacion() {
  const [FinalizacionData, setFinalizacionData] = useState<servicio | null>(null);
  const [id_reporte, setIdReporte] = useState<number | null>(null);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();


interface servicio {
  fecha_inicio: string;
  usuario_sicp: number;
  id_reporte : number;
  ubicacion_inicio: String;
}

useEffect(() => {
  if (id_reporte === null) return;

  const fetchFinalizacion = async () => {
    setFinalizacionData(null);
    setIdReporte(null);

    try {
      const response = await fetch(`http://ecosistemasesp.unp.gov.co/sicp/api/finalizacion/${id_reporte}`);
      const ApiFinalizacion = await response.json();
      setFinalizacionData(ApiFinalizacion);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  };
  fetchFinalizacion();
}, [id_reporte]);

useEffect(() => {
  if (FinalizacionData) 
  {
    console.log(FinalizacionData.id_reporte)
    navigation.navigate('ResumenFinalizacion', { id: FinalizacionData.id_reporte });
  }
}, [FinalizacionData]);

return setIdReporte;
}
