/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useRef, useState} from 'react';
import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid} from 'react-native';

const useGetLocation = () => {
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const watchId = useRef<number | null>(null);

  useEffect(() => {
    requesLocationPermission();
    return () => {
      //   Geolocation.clearWatch(subscriptionId!);
      clearWatch();
    };
  }, [lat, lng]);

  const clearWatch = () => {
    try {
      if (watchId.current !== null) {
        Geolocation.clearWatch(watchId.current);
        watchId.current = null;
      }
    } catch (err) {
      console.log('[clear]', err);
    }
  };

  const requesLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // check permissions is granted
        getOneTimeLocation();
        subscribeLocationLocation();
      } else {
        console.log('Permission Denied');
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const getOneTimeLocation = () => {
    try {
      Geolocation.getCurrentPosition(
        loc => {
          setLat(loc.coords.latitude);
          setLng(loc.coords.longitude);
        },
        error => {
          console.log('Error get location >> ', error.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 30000,
          maximumAge: 10000,
        },
      );
    } catch (err) {
      console.warn('[one time]', err);
    }
  };

  const subscribeLocationLocation = () => {
    try {
      watchId.current = Geolocation.watchPosition(
        async loc => {
          setLat(loc.coords.latitude);
          setLng(loc.coords.longitude);
        },
        error => {
          console.log('subs loc>> ', error.message);
        },
        {
          interval: 1000,
          enableHighAccuracy: true,
          //   maximumAge: 2000,
        },
      );
    } catch (err) {
      console.warn('[watch]', err);
    }
  };
  return {lat, lng};
};

export default useGetLocation;
