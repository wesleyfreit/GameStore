import Geolocation from '@react-native-community/geolocation';
import React, { useEffect, useState } from 'react';
import { PermissionsAndroid, Platform, View } from 'react-native';
import MapView, {
  MapPressEvent,
  Marker,
  PROVIDER_DEFAULT,
  type Region,
} from 'react-native-maps';

import { colors } from '@/styles/global';
import { GoogleMapsComponentProps } from './interfaces';
import { mapContainerStyle, mapStyle } from './styles';

export const GoogleMaps = ({ point, setPoint }: GoogleMapsComponentProps) => {
  const [userLocation, setUserLocation] = useState<Region | undefined>(undefined);

  useEffect(() => {
    getMyLocation();
  }, []);

  Geolocation.setRNConfiguration({
    locationProvider: 'playServices',
    skipPermissionRequests: true,
  });

  const getMyLocation = () => {
    Geolocation.getCurrentPosition((position) => {
      const oneDegreeOfLatitudeInMeters = 111320;
      const { latitude, longitude, accuracy } = position.coords;

      setUserLocation({
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: accuracy / oneDegreeOfLatitudeInMeters,
        longitudeDelta:
          accuracy / (oneDegreeOfLatitudeInMeters * Math.cos(latitude * (Math.PI / 180))),
      });
    });
  };

  const handleSetPoint = (e: MapPressEvent) => {
    setPoint({
      latitude: e.nativeEvent.coordinate.latitude,
      longitude: e.nativeEvent.coordinate.longitude,
      latitudeDelta: 0.000949,
      longitudeDelta: 0.000952,
    });
  };

  return (
    <View style={mapContainerStyle}>
      <MapView
        onMapReady={() =>
          Platform.OS === 'android'
            ? PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
              ).then(() => {})
            : null
        }
        style={mapStyle}
        provider={PROVIDER_DEFAULT}
        zoomEnabled
        minZoomLevel={3}
        zoomControlEnabled
        loadingEnabled
        showsUserLocation
        liteMode
        
        region={userLocation}
        onPress={handleSetPoint}
      >
        {point && (
          <Marker
            pinColor={colors.primary.color}
            coordinate={{ latitude: point?.latitude, longitude: point?.longitude }}
          />
        )}
      </MapView>
    </View>
  );
};
