import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  ResumenOtro: {id : number};
  novedadOtro: { desdePanelNovedades: boolean, id : number };
};

export function useOtro() {
  const [OtroData, setOtroData] = useState<servicio | null>(null);
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

  const fetchOtro = async () => {
    setOtroData(null);
    setIdReporte(null);

    try {
      const response = await fetch(`http://ecosistemasesp.unp.gov.co/sicp/api/otroreporte/${id_reporte}`);
      const ApiOtro = await response.json();
      setOtroData(ApiOtro);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  };
  fetchOtro();
}, [id_reporte]);

useEffect(() => {
  if (OtroData) 
  {
    console.log(OtroData.id_reporte)
    navigation.navigate('ResumenOtro', { id: OtroData.id_reporte });
  }
}, [OtroData]);

return setIdReporte;
}
