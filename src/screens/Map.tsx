import React, { Profiler, useMemo, useState } from 'react';
import { Region } from 'react-native-maps';

import ClusteredMap from '../components/ClusteredMap';
import MarkerInfo from '../components/MarkerInfo';
import Search from '../components/Search';
import { generatePoleData, Poles, PoleData, ClientMarker } from '../utils/poles';

const INITIAL_REGION: Region = {
  latitude: -6,
  longitude: -55,
  latitudeDelta: 5,
  longitudeDelta: 5,
};

const Map: React.FC = () => {
  const data = useMemo<PoleData>(() => generatePoleData(Poles.North), []);
  const [filteredMarkers, setFilteredMarkers] = useState<ClientMarker[]>(data.markers);
  const [selectedMarker, setSelectedMarker] = useState<ClientMarker | null>();

  function handleSearch(text: string) {
    let newFilteredMarkers = [...data.markers];
    if (text) {
      newFilteredMarkers = newFilteredMarkers.filter(marker =>
        marker.title.toLowerCase().includes(text.toLowerCase()),
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
        <ClusteredMap
          initialRegion={INITIAL_REGION}
          coordinates={data.coordinates}
          markers={filteredMarkers}
          onSelectMarker={setSelectedMarker}
        />
      </Profiler>

      <Search placeholder="Search by title" onSearch={handleSearch} />
      {selectedMarker ? <MarkerInfo marker={selectedMarker} /> : null}
    </>
  );
};

export default Map;
