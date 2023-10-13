import { useContext, useEffect, useState } from 'react';
import { PermissionsAndroid, Platform, View } from 'react-native';
import MapView, { Marker, Region,  } from 'react-native-maps';

import { GoogleMapsContext } from '@/contexts/GoogleMaps/GoogleMapsContext';
import { colors } from '@/styles/global';
import Geolocation from '@react-native-community/geolocation';
import { GoogleMapsFunctionProps } from './interfaces';
import { googleMapsStyles } from './styles';

export const GoogleMaps = ({ navigation }: GoogleMapsFunctionProps) => {
  const { setCoords } = useContext(GoogleMapsContext);
  const [userLocation, setUserLocation] = useState<Region | undefined>(undefined);
  const [point, setPoint] = useState<Region | undefined>(undefined);

  useEffect(() => {
    if (navigation) {
      setCoords(point);
      navigation.goBack();
    }
  }, [navigation]);

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

  return (
    <View style={googleMapsStyles.container}>
      <MapView
        onMapReady={() =>
          Platform.OS === 'android'
            ? PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then(
                () => {},
              )
            : null
        }
        style={googleMapsStyles.map}
        zoomEnabled={true}
        minZoomLevel={3}
        zoomControlEnabled={true}
        loadingEnabled={true}
        showsUserLocation={true}
        region={userLocation}
        onPress={(e) =>
          setPoint({
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude,
            latitudeDelta: 0.000949,
            longitudeDelta: 0.000952,
          })
        }
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
