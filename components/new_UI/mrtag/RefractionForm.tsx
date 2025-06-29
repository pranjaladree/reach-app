import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

const RefractionForm: React.FC = () => {
  const [pgp, setPgp] = useState({ sph: '', cyl: '', axis: '', add: '' });
  const [dry, setDry] = useState({ sph: '', cyl: '', axis: '' });
  const [cyclo, setCyclo] = useState({ sph: '', cyl: '', axis: '' });
  const [acceptance, setAcceptance] = useState({ sph: '', cyl: '', axis: '' });
  const [bcva, setBcva] = useState('');

  const handleInput = (setter: any, key: string, value: string) => setter((prev: any) => ({ ...prev, [key]: value }));

  return (
    <View>
      <Text style={styles.section}>PGP</Text>
      <View style={styles.row}>
        <TextInput style={styles.input} placeholder="SPH" value={pgp.sph} onChangeText={(val) => handleInput(setPgp, 'sph', val)} />
        <TextInput style={styles.input} placeholder="CYL" value={pgp.cyl} onChangeText={(val) => handleInput(setPgp, 'cyl', val)} />
        <TextInput style={styles.input} placeholder="AXIS" value={pgp.axis} onChangeText={(val) => handleInput(setPgp, 'axis', val)} />
        <TextInput style={styles.input} placeholder="ADD" value={pgp.add} onChangeText={(val) => handleInput(setPgp, 'add', val)} />
      </View>

      <Text style={styles.section}>DRY RETINOSCOPY</Text>
      <View style={styles.row}>
        <TextInput style={styles.input} placeholder="SPH" value={dry.sph} onChangeText={(val) => handleInput(setDry, 'sph', val)} />
        <TextInput style={styles.input} placeholder="CYL" value={dry.cyl} onChangeText={(val) => handleInput(setDry, 'cyl', val)} />
        <TextInput style={styles.input} placeholder="AXIS" value={dry.axis} onChangeText={(val) => handleInput(setDry, 'axis', val)} />
      </View>

      <Text style={styles.section}>CYCLO RETINOSCOPY</Text>
      <View style={styles.row}>
        <TextInput style={styles.input} placeholder="SPH" value={cyclo.sph} onChangeText={(val) => handleInput(setCyclo, 'sph', val)} />
        <TextInput style={styles.input} placeholder="CYL" value={cyclo.cyl} onChangeText={(val) => handleInput(setCyclo, 'cyl', val)} />
        <TextInput style={styles.input} placeholder="AXIS" value={cyclo.axis} onChangeText={(val) => handleInput(setCyclo, 'axis', val)} />
      </View>

      <Text style={styles.section}>ACCEPTANCE</Text>
      <View style={styles.row}>
        <TextInput style={styles.input} placeholder="SPH" value={acceptance.sph} onChangeText={(val) => handleInput(setAcceptance, 'sph', val)} />
        <TextInput style={styles.input} placeholder="CYL" value={acceptance.cyl} onChangeText={(val) => handleInput(setAcceptance, 'cyl', val)} />
        <TextInput style={styles.input} placeholder="AXIS" value={acceptance.axis} onChangeText={(val) => handleInput(setAcceptance, 'axis', val)} />
      </View>

      <Text style={styles.section}>BCVA</Text>
      <TextInput style={styles.inputFull} placeholder="BCVA" value={bcva} onChangeText={setBcva} />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>✓ Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RefractionForm;

const styles = StyleSheet.create({
  section: {
    fontWeight: 'bold',
    color: '#004aad',
    marginTop: 16,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#004aad',
    borderRadius: 6,
    padding: 10,
    backgroundColor: '#fff',
    width: '22%',
  },
  inputFull: {
    borderWidth: 1,
    borderColor: '#004aad',
    borderRadius: 6,
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#004aad',
    padding: 14,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
