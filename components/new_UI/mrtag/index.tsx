import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import MRTagForm from './MRTagForm';
import VisualAcuityForm from './VisualAcuityForm';
import RefractionForm from './RefractionForm';
import AdviceForm from './AdviceForm';
import VisualAcuity from '@/components/mr-tag/VisualAcuity';
import Refraction from '@/components/mr-tag/Refraction';
import Advice from '@/components/mr-tag/Advice';
import MRTagItem from '@/components/mr-tag/MRTag';


const tabOptions = ['MR TAG', 'Visual Acuity', 'Refraction', 'Advice'];

const ScreeningTabs: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('MR TAG');

  const renderTabContent = () => {
    switch (selectedTab) {
      case 'MR TAG':
        return <MRTagItem />;
      case 'Visual Acuity':
        return <VisualAcuity />;
      case 'Refraction':
        return <Refraction />;
      case 'Advice':
        return <Advice />;
      default:
        return null;
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.header}>Examination Details</Text>
      <View style={styles.tabContainer}>
        {tabOptions.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, selectedTab === tab && styles.tabActive]}
            onPress={() => setSelectedTab(tab)}
          >
            <Text style={[styles.tabText, selectedTab === tab && styles.tabTextActive]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.formContainer}>{renderTabContent()}</View>
    </ScrollView>
  );
};

export default ScreeningTabs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  contentContainer: {
    padding: 16,
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#004aad',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingBottom: 8,
    marginBottom: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#004aad',
    borderRightWidth: 0,
    backgroundColor: '#fff',
  },
  tabActive: {
    backgroundColor: '#004aad',
  },
  tabText: {
    textAlign: 'center',
    color: '#004aad',
    fontWeight: '600',
  },
  tabTextActive: {
    color: '#fff',
  },
  formContainer: {
    gap: 16,
  },
});
