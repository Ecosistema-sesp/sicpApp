import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  ResumenViaticos: {id : number};
  novedadViaticos: { desdePanelNovedades: boolean, id : number };
};

export function useViaticos() {
  const [ViaticosData, setViaticosData] = useState<viaticos | null>(null);
  const [id_reporte, setIdReporte] = useState<number | null>(null);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();


interface viaticos {
  fecha_inicio: string;
  usuario_sicp: number;
  id_reporte : number;
  ubicacion_inicio: String;
  ubicacion_fin:String;
}

useEffect(() => {
  if (id_reporte === null) return;

  const fetchViaticos = async () => {
    setViaticosData(null);
    setIdReporte(null);

    try {
      const response = await fetch(`http://ecosistemasesp.unp.gov.co/sicp/api/viaticos/${id_reporte}`);
      const ApiViaticos = await response.json();
      setViaticosData(ApiViaticos);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  };
  fetchViaticos();
}, [id_reporte]);

useEffect(() => {
    if (ViaticosData) 
        {
          console.log(ViaticosData.id_reporte)
          navigation.navigate('ResumenViaticos', { id: ViaticosData.id_reporte });
        }
}, [ViaticosData]);

return setIdReporte;
}
