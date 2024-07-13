import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  ResumenServicio: {id : number};
  novedadServicio: { desdePanelNovedades: boolean, id : number };
};

export function useServicio() {
  const [servicioData, setServicioData] = useState<servicio | null>(null);
  const [id_reporte, setIdReporte] = useState<number | null>(null);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();


interface servicio {
  fecha_inicio: string;
  usuario_sicp: number;
  id_reporte : number;
  ubicacion_inicio: String;
  ubicacion_fin:String;
}

useEffect(() => {
  if (id_reporte === null) return;

  const fetchServicio = async () => {
    setServicioData(null);
    setIdReporte(null);

    try {
      const response = await fetch(`http://ecosistemasesp.unp.gov.co/sicp/api/servicio/${id_reporte}`);
      const ApiServicio = await response.json();
      setServicioData(ApiServicio);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  };
  fetchServicio();
}, [id_reporte]);

useEffect(() => {
  if (servicioData && servicioData.ubicacion_fin) {
    navigation.navigate('ResumenServicio', { id: servicioData.id_reporte });
  } else if (servicioData) {
    navigation.navigate('novedadServicio', { desdePanelNovedades: true, id: servicioData.id_reporte });
  }
}, [servicioData]);

return setIdReporte;
}
