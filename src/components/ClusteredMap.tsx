import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import ClusteredMapView from 'react-native-map-clustering';
import { LatLng, Marker, Polygon, Region } from 'react-native-maps';

import { ClientMarker } from '../utils/poles';

interface ClusteredMapProps {
  initialRegion: Region;
  coordinates: LatLng[];
  markers: ClientMarker[];
  onSelectMarker(marker: ClientMarker): void;
}

const ClusteredMap: React.FC<ClusteredMapProps> = memo(
  ({ initialRegion, coordinates, markers, onSelectMarker }) => {
    return (
      <ClusteredMapView
        style={styles.map}
        showsCompass={false}
        initialRegion={initialRegion}
        clusterColor="#39ac4a"
        clusterTextColor="#f7f7f7"
        minZoom={1}
        maxZoom={8}
        tracksViewChanges={false}
        nodeSize={10}
        extent={120}
        radius={20}
      >
        {coordinates.length ? (
          <Polygon coordinates={coordinates} strokeColor="#39ac4a" strokeWidth={2} />
        ) : null}

        {markers.length
          ? markers.map(marker => (
              <Marker
                key={marker.id}
                onPress={() => onSelectMarker(marker)}
                title={marker.title}
                coordinate={marker}
                tracksViewChanges={false}
                pinColor="#39ac4a"
              />
            ))
          : null}
      </ClusteredMapView>
    );
  },
  (previous, next) =>
    previous.markers === next.markers &&
    previous.coordinates === next.coordinates &&
    previous.initialRegion === next.initialRegion,
);

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

export default ClusteredMap;
