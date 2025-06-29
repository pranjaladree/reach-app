import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import StyledDropdown, { DropdownItem } from '../StyledDropdown';


const visualOptions: DropdownItem[] = [
  { label: '6/6', value: '6/6' },
  { label: '6/9', value: '6/9' },
  { label: '6/12', value: '6/12' },
];

const VisualAcuityForm: React.FC = () => {
  const [dvaOd, setDvaOd] = useState(visualOptions[0]);
  const [dvaOs, setDvaOs] = useState(visualOptions[0]);
  const [phOd, setPhOd] = useState(visualOptions[0]);
  const [phOs, setPhOs] = useState(visualOptions[0]);
  const [nvaOd, setNvaOd] = useState(visualOptions[0]);
  const [nvaOs, setNvaOs] = useState(visualOptions[0]);

  return (
    <View>
      <Text style={styles.header}>With Spectacle</Text>
      <View style={styles.row}>
        <StyledDropdown
          label="DVA-OD (RE)"
          items={visualOptions}
          selectedItem={dvaOd}
          onChange={(val) => setDvaOd(visualOptions.find(v => v.value === val) || dvaOd)}
        />
        <StyledDropdown
          label="DVA-OS (LE)"
          items={visualOptions}
          selectedItem={dvaOs}
          onChange={(val) => setDvaOs(visualOptions.find(v => v.value === val) || dvaOs)}
        />
      </View>
      <View style={styles.row}>
        <StyledDropdown
          label="PH-OD (RE)"
          items={visualOptions}
          selectedItem={phOd}
          onChange={(val) => setPhOd(visualOptions.find(v => v.value === val) || phOd)}
        />
        <StyledDropdown
          label="PH-OS (LE)"
          items={visualOptions}
          selectedItem={phOs}
          onChange={(val) => setPhOs(visualOptions.find(v => v.value === val) || phOs)}
        />
      </View>
      <View style={styles.row}>
        <StyledDropdown
          label="NVA-OD (RE)"
          items={visualOptions}
          selectedItem={nvaOd}
          onChange={(val) => setNvaOd(visualOptions.find(v => v.value === val) || nvaOd)}
        />
        <StyledDropdown
          label="NVA-OS (LE)"
          items={visualOptions}
          selectedItem={nvaOs}
          onChange={(val) => setNvaOs(visualOptions.find(v => v.value === val) || nvaOs)}
        />
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>✓ Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default VisualAcuityForm;

const styles = StyleSheet.create({
  header: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#004aad',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
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
