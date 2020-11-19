import React, { Profiler, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import MapView from 'react-native-map-clustering';
import { Marker, Polygon, Region } from 'react-native-maps';

import MarkerInfo from '../components/MarkerInfo';
import Search from '../components/Search';
import {
  generateRegions,
  Poles,
  Pole,
  PoleData,
  ClientMarker,
} from '../utils/regions';

export function MapScreen() {
  const [pole] = useState<Pole>(Poles.North);
  const [data, setData] = useState<PoleData>({ coordinates: [], markers: [] });
  const [filteredMarkers, setFilteredMarkers] = useState<ClientMarker[]>([]);
  const [selectedMarker, setSelectedMarker] = useState<ClientMarker | null>();

  const INITIAL_REGION: Region = {
    latitude: -6,
    longitude: -55,
    latitudeDelta: 5,
    longitudeDelta: 5,
  };

  useEffect(() => {
    const region = generateRegions(pole);
    setData(() => region);
    setFilteredMarkers(() => region.markers);
  }, [pole]);

  function handleSearch(text: string) {
    let newFilteredMarkers = [...data.markers];
    if (text) {
      newFilteredMarkers = newFilteredMarkers.filter((marker) =>
        marker.title.toLowerCase().includes(text.toLowerCase())
      );
    }
    setFilteredMarkers(newFilteredMarkers);
  }

  function onRender(id: string, phase: string, actualDuration: number) {
    // logging map rendering duration
    console.log(`${id} - ${actualDuration}ms (${phase})`);
  }

  return (
    <>
      <Profiler id="mapview" onRender={onRender}>
        <MapView
          style={styles.map}
          showsCompass={false}
          initialRegion={INITIAL_REGION}
          clusterColor="#39ac4a"
          clusterTextColor="#f7f7f7"
          minZoom={1}
          maxZoom={8}
          tracksViewChanges={false}
          nodeSize={10}
          extent={120}
          radius={20}
        >
          {data?.coordinates.length ? (
            <Polygon
              coordinates={data.coordinates}
              strokeColor="#39ac4a"
              strokeWidth={2}
            />
          ) : null}

          {filteredMarkers.length
            ? filteredMarkers.map((marker, index) => (
                <Marker
                  onPress={() => setSelectedMarker(marker)}
                  title={marker.title}
                  coordinate={marker}
                  key={String(index)}
                  tracksViewChanges={false}
                  pinColor="#39ac4a"
                />
              ))
            : null}
        </MapView>
      </Profiler>

      <Search placeholder="Search by title" onSearch={handleSearch} />
      {selectedMarker ? <MarkerInfo marker={selectedMarker} /> : null}
    </>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
