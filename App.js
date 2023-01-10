import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Formulario from './components/Formulario';
import Header from './components/Header';
import Cotizacion from './components/Cotizacion';
import axios from 'axios';

const App = () => {
  const [moneda, setMoneda] = useState('');
  const [criptomoneda, setCriptomoneda] = useState('');
  const [consultarAPI, setConsultarAPI] = useState(false);
  const [resultado, setResultado] = useState({});
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    const analizarCriptomoneda = async () => {
      if (consultarAPI) {
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
        const resultado = await axios.get(url);

        setCargando(true);

        setTimeout(() => {
          setResultado(resultado.data.DISPLAY[criptomoneda][moneda]);
          setConsultarAPI(false);
          setCargando(false);
        }, 3000);
      }
    };
    analizarCriptomoneda();
  }, [consultarAPI]);

  const componente = cargando ? (
    <ActivityIndicator size="large" color="#5e49e2" />
  ) : (
    <Cotizacion resultado={resultado} />
  );

  return (
    <ScrollView>
      <Header />
      <Image
        style={styles.imagen}
        source={require('./assets/img/cryptomonedas.png')}
      />
      <View style={styles.contenido}>
        <Formulario
          moneda={moneda}
          setMoneda={setMoneda}
          criptomoneda={criptomoneda}
          setCriptomoneda={setCriptomoneda}
          setConsultarAPI={setConsultarAPI}
        />
      </View>

      <View style={styles.separadorSpinner}>{componente}</View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  imagen: {
    width: '100%',
    height: 150,
    marginHorizontal: '2.5%',
  },
  contenido: {
    marginHorizontal: '2.5%',
  },
  separadorSpinner: {
    marginTop: 40,
  },
});

export default App;
