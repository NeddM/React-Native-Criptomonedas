import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, TouchableHighlight, Alert} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';

const Formulario = ({
  moneda,
  setMoneda,
  criptomoneda,
  setCriptomoneda,
  setConsultarAPI,
}) => {
  const [criptomonedas, setCriptomonedas] = useState([]);

  const analizarPrecio = () => {
    if (moneda === '' || criptomoneda === '') {
      mostrarAlerta();
      return;
    }

    setConsultarAPI(true);
  };

  const mostrarAlerta = () => {
    Alert.alert('Error', 'Ambos campos son obligatorios');
  };

  useEffect(() => {
    const consultarAPI = async () => {
      const url =
        'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
      const resultado = await axios.get(url);
      setCriptomonedas(resultado.data.Data);
      console.log(resultado.data.Data);
    };
    consultarAPI();
  }, []);

  return (
    <View>
      <Text style={styles.label}>Moneda</Text>
      <Picker
        selectedValue={moneda}
        onValueChange={setMoneda}
        itemStyle={{height: 120}}>
        <Picker.Item label="- Seleccionar -" value={''} />
        <Picker.Item label="Euro" value={'EUR'} />
        <Picker.Item label="Dolar de EEUU" value={'USD'} />
        <Picker.Item label="Libra Esterlina" value={'GBP'} />
      </Picker>

      <Text style={styles.label}>Criptomoneda</Text>
      <Picker
        selectedValue={criptomoneda}
        onValueChange={setCriptomoneda}
        itemStyle={{height: 120}}>
        <Picker.Item label="- Seleccionar -" value={''} />
        {criptomonedas.map(cripto => (
          <Picker.Item
            key={cripto.CoinInfo.Id}
            label={cripto.CoinInfo.FullName}
            value={cripto.CoinInfo.Name}
          />
        ))}
      </Picker>
      <TouchableHighlight
        onPress={() => analizarPrecio()}
        style={styles.botonAnalizar}>
        <Text style={styles.textoAnalizar}>Analizar</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontFamily: 'Lato-Black',
    textTransform: 'uppercase',
    textAlign: 'center',
    fontSize: 22,
    marginVertical: 20,
  },
  botonAnalizar: {
    backgroundColor: '#5e49e2',
    padding: 10,
    marginTop: 20,
  },
  textoAnalizar: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Lato-Black',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
});

export default Formulario;
