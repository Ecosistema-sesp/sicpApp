import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  ResumenDesplazamiento: {id : number};
  NovedadDesplazamiento: { desdePanelNovedades: boolean, id : number };
};


export function useDesplazamiento() {
  const [desplazamientoData, setDesplazamientoData] = useState<desplazamiento | null>(null);
  const [id_reporte, setIdReporte] = useState<number | null>(null);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  
  interface desplazamiento {
    fecha_inicio: string;
    usuario_sicp: number;
    id_reporte : number;
    ubicacion_inicio: String;
    departamentoinicio: String;
    municipioinicio:String;
    ubicacion_fin:String;
    departamentofin:String;
    municipiofin:String;
  }

    useEffect(() => {
        if (id_reporte === null) return;
      
        const fetchdesplazamiento = async () => {
          setDesplazamientoData(null);
          setIdReporte(null);
      
          try {
            const response = await fetch(`http://ecosistemasesp.unp.gov.co/sicp/api/dhesquema/${id_reporte}`);
            const Apidesplazamiento = await response.json();
            setDesplazamientoData(Apidesplazamiento);
          } catch (error) {
            console.error('Error al obtener los datos:', error);
          }
        };
        fetchdesplazamiento();
      }, [id_reporte]);
  
    useEffect(() => {
      if (desplazamientoData && desplazamientoData.ubicacion_fin) {
        navigation.navigate('ResumenDesplazamiento', { id: desplazamientoData.id_reporte });
      } else if (desplazamientoData){
        navigation.navigate('NovedadDesplazamiento', { id: desplazamientoData.id_reporte, desdePanelNovedades: true });
      }
    }, [desplazamientoData]);
  
    return setIdReporte;
  }
  

export function desplazamientoUbicacionFin() {
  const [ubicacion_fin, setUbicacionFin] = useState<String | null>(null);
  const [id_reporte, setIdReporte] = useState<number | null>(null);

  interface desplazamiento {
    fecha_inicio: string;
    usuario_sicp: number;
    id_reporte : number;
    ubicacion_inicio: String;
    departamentoinicio: String;
    municipioinicio:String;
    ubicacion_fin:String;
    departamentofin:String;
    municipiofin:String;
  }
  
  useEffect(() => {
    if (id_reporte === null) return;

    const fetchUbicacionFin = async () => {
      try {
        const response = await fetch(`http://ecosistemasesp.unp.gov.co/sicp/api/dhesquema/${id_reporte}`);
        const Apidesplazamiento = await response.json();
        setUbicacionFin(Apidesplazamiento.ubicacion_fin);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };
    fetchUbicacionFin();
  }, [id_reporte]);

  return { setIdReporte, ubicacion_fin };
}