import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import StyledDropdown, { DropdownItem } from '../StyledDropdown';


const facilities: DropdownItem[] = [
  { label: 'Facility A', value: 'a' },
  { label: 'Facility B', value: 'b' },
];

const reasons: DropdownItem[] = [
  { label: 'Follow-up', value: 'follow_up' },
  { label: 'Specialist Required', value: 'specialist' },
];

const surgeryTypes: DropdownItem[] = [
  { label: 'Cataract', value: 'cataract' },
  { label: 'Glaucoma', value: 'glaucoma' },
];

const AdviceForm: React.FC = () => {
  const [spectacles, setSpectacles] = useState(false);
  const [medicine, setMedicine] = useState(false);
  const [sameGlasses, setSameGlasses] = useState(false);
  const [referred, setReferred] = useState(false);
  const [surgery, setSurgery] = useState(false);

  const [facility, setFacility] = useState<DropdownItem>(facilities[0]);
  const [reason, setReason] = useState<DropdownItem>(reasons[0]);
  const [surgeryType, setSurgeryType] = useState<DropdownItem>(surgeryTypes[0]);

  return (
    <View>
      <Text style={styles.section}>Advise</Text>

      <View style={styles.checkRow}>
        <Text onPress={() => setSpectacles(!spectacles)} style={styles.checkbox}>{spectacles ? '☑' : '☐'} Spectacles Prescribed</Text>
        <Text onPress={() => setMedicine(!medicine)} style={styles.checkbox}>{medicine ? '☑' : '☐'} Medicine Prescribed</Text>
        <Text onPress={() => setSameGlasses(!sameGlasses)} style={styles.checkbox}>{sameGlasses ? '☑' : '☐'} Continue with Same Glasses</Text>
      </View>

      <View style={styles.checkRow}>
        <Text onPress={() => setReferred(!referred)} style={styles.checkbox}>{referred ? '☑' : '☐'} Referred</Text>
        <StyledDropdown
          label="Facility"
          items={facilities}
          selectedItem={facility}
          onChange={(val) => {
            const f = facilities.find((i) => i.value === val);
            if (f) setFacility(f);
          }}
        />
        <StyledDropdown
          label="Reason"
          items={reasons}
          selectedItem={reason}
          onChange={(val) => {
            const r = reasons.find((i) => i.value === val);
            if (r) setReason(r);
          }}
        />
      </View>

      <View style={styles.checkRow}>
        <Text onPress={() => setSurgery(!surgery)} style={styles.checkbox}>{surgery ? '☑' : '☐'} Surgery Advised</Text>
        <StyledDropdown
          label="Surgery Type"
          items={surgeryTypes}
          selectedItem={surgeryType}
          onChange={(val) => {
            const s = surgeryTypes.find((i) => i.value === val);
            if (s) setSurgeryType(s);
          }}
        />
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>✓ Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AdviceForm;

const styles = StyleSheet.create({
  section: {
    fontWeight: 'bold',
    color: '#004aad',
    fontSize: 16,
    marginBottom: 12,
  },
  checkRow: {
    marginBottom: 12,
    gap: 12,
  },
  checkbox: {
    fontSize: 15,
    color: '#333',
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
