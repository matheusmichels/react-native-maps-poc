import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import { ClientMarker } from '../utils/poles';

interface MarkerInfoProps {
  marker: ClientMarker;
}

const MarkerInfo: React.FC<MarkerInfoProps> = ({ marker }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{marker.title}</Text>
      <Text style={styles.address}>{marker.address}</Text>
      <View style={styles.footer}>
        <Text style={styles.text}>Visited in: {marker.visited.toLocaleDateString()}</Text>
        <Text style={styles.text}>Sales: U$ {marker.amount}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    height: 120,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#39ac4a',
    borderRadius: 20,
    padding: 15,
  },
  title: {
    color: '#eee',
    fontSize: 18,
    fontWeight: 'bold',
  },
  address: {
    color: '#fff',
    fontSize: 14,
    fontStyle: 'italic',
    overflow: 'hidden',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 'auto',
  },
  text: {
    color: '#fff',
  },
});

export default MarkerInfo;
