import { LatLng, Region } from 'react-native-maps';
import faker from 'faker';

export type ClientMarker = Region & {
  title: string;
  address: string;
  visited: Date;
  amount: string;
};

export interface Pole {
  lonStart: number;
  lonEnd: number;
  latStart: number;
  latEnd: number;
}

export interface PoleData {
  coordinates: LatLng[];
  markers: ClientMarker[];
}

export const Poles = {
  North: { latStart: -2, lonStart: -60, latEnd: -10, lonEnd: -50 },
  South: { lonStart: 1, lonEnd: 1, latStart: 1, latEnd: 1 },
};

export function generateRegions(pole: Pole): PoleData {
  const coordinates = [
    { latitude: pole.latStart, longitude: pole.lonStart },
    { latitude: pole.latStart, longitude: pole.lonEnd },
    { latitude: pole.latEnd, longitude: pole.lonEnd },
    { latitude: pole.latEnd, longitude: pole.lonStart },
  ];

  const markers = new Array(20000).fill(true).map((_value, index) => ({
    title: `title ${index}`,
    address: faker.address.streetAddress(),
    visited: faker.date.past(),
    amount: faker.finance.amount(),
    longitude: pole.lonStart + Math.random() * (pole.lonEnd - pole.lonStart),
    latitude: pole.latStart + Math.random() * (pole.latEnd - pole.latStart),
    latitudeDelta: 1,
    longitudeDelta: 1,
  }));

  return { coordinates, markers };
}
