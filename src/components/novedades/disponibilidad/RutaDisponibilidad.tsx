import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  ResumenDisponibilidad: {id : number};
  novedadDisponibilidad: { desdePanelNovedades: boolean, id : number };
};

export function useDisponibilidad() {
  const [DisponibilidadData, setDisponibilidadData] = useState<servicio | null>(null);
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

  const fetchDisponibilidad = async () => {
    setDisponibilidadData(null);
    setIdReporte(null);

    try {
      const response = await fetch(`http://ecosistemasesp.unp.gov.co/sicp/api/disponibilidad/${id_reporte}`);
      const ApiDisponibilidad = await response.json();
      setDisponibilidadData(ApiDisponibilidad);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  };
  fetchDisponibilidad();
}, [id_reporte]);

useEffect(() => {
  if (DisponibilidadData) 
  {
    console.log(DisponibilidadData.id_reporte)
    navigation.navigate('ResumenDisponibilidad', { id: DisponibilidadData.id_reporte });
  }
}, [DisponibilidadData]);

return setIdReporte;
}
