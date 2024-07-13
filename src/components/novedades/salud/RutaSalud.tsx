import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  ResumenSalud: {id : number};
  novedadSalud: { desdePanelNovedades: boolean, id : number };
};

export function useSalud() {
  const [saludData, setSaludData] = useState<servicio | null>(null);
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

  const fetchSalud = async () => {
    setSaludData(null);
    setIdReporte(null);

    try {
      const response = await fetch(`http://ecosistemasesp.unp.gov.co/sicp/api/salud/${id_reporte}`);
      const ApiSalud = await response.json();
      setSaludData(ApiSalud);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  };
  fetchSalud();
}, [id_reporte]);

useEffect(() => {
  if (saludData) 
  {
    console.log(saludData.id_reporte)
    navigation.navigate('ResumenSalud', { id: saludData.id_reporte });
  }
}, [saludData]);

return setIdReporte;
}
