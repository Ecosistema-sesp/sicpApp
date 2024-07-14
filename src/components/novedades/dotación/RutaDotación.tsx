import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  ResumenDotacion: {id : number};
  novedadDotacion: { desdePanelNovedades: boolean, id : number };
};

export function useDotacion() {
  const [dotacionData, setDotacionData] = useState<dotacion | null>(null);
  const [id_reporte, setIdReporte] = useState<number | null>(null);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();


interface dotacion {
  fecha_inicio: string;
  usuario_sicp: number;
  id_reporte : number;
  ubicacion_inicio: String;
  ubicacion_fin:String;
}

useEffect(() => {
  if (id_reporte === null) return;

  const fetchDotacion = async () => {
    setDotacionData(null);
    setIdReporte(null);

    try {
      const response = await fetch(`http://ecosistemasesp.unp.gov.co/sicp/api/dotacion/${id_reporte}`);
      const ApiDotacion = await response.json();
      setDotacionData(ApiDotacion);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  };
  fetchDotacion();
}, [id_reporte]);

useEffect(() => {
    if (dotacionData) 
        {
          console.log(dotacionData.id_reporte)
          navigation.navigate('ResumenDotacion', { id: dotacionData.id_reporte });
        }
}, [dotacionData]);

return setIdReporte;
}
