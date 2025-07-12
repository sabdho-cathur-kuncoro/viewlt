/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  bgColor2,
  blackColor,
  greenColor,
  primaryColor,
  redColor,
  redRGBAColor,
  whiteColor,
} from '../../constant/theme';
import {Button, FocusAwareStatusBar} from '../../components';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MapView, {
  Callout,
  Circle,
  Marker,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import {shadow} from '../../constant/style';
import useGetLocation from '../../hooks/useGetLocation';
// import {storage} from '../../utils/storage';
// import {compare} from '../../utils/allowedZone';

const StoreZonation = ({navigation, route}: any) => {
  const {store} = route.params ?? {};
  const [isInsideZone, setIsInsideZone] = useState<boolean>(false);
  const [showUserLocation, setShowUserLocation] = useState<boolean>(false);
  const {lat, lng} = useGetLocation();
  const timerRef = useRef<any>(1000);

  useEffect(() => {
    const timerId = setInterval(() => {
      timerRef.current -= 1;
      if (timerRef.current < 0) {
        clearInterval(timerId);
      } else {
        zoneAllowed();
      }
    }, 3000);

    return () => {
      clearInterval(timerId);
    };
  }, [lat, lng, isInsideZone]);

  const zoneAllowed = useCallback(async () => {
    try {
      // const currLocation = {
      //   lat,
      //   lng,
      // };
      // const storeLocation = {
      //   lat: store?.latitude,
      //   lng: store?.longitude,
      // };
      // const storeRadius = store?.radius;
      // let status = compare(currLocation, storeLocation, storeRadius);
      // console.log(status);
      // setIsInsideZone(status);
      setTimeout(() => {
        setIsInsideZone(true);
      }, 2000);
    } catch (err) {
      console.log(err);
    }
  }, [isInsideZone, lat, lng]);

  const onMapReady = () => {
    setShowUserLocation(true);
  };

  return (
    <View style={styles.page}>
      <FocusAwareStatusBar
        backgroundColor={bgColor2}
        barStyle={'dark-content'}
      />
      <View
        style={[
          shadow,
          {
            width: '100%',
            alignItems: 'center',
            flexDirection: 'row',
            paddingVertical: 10,
            backgroundColor: bgColor2,
          },
        ]}>
        <TouchableOpacity
          style={{width: '12%'}}
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}>
          <MaterialIcon name="chevron-left" size={32} color={blackColor} />
        </TouchableOpacity>
        <Text style={{color: blackColor, fontSize: 18, fontWeight: '700'}}>
          Store Zonation
        </Text>
      </View>
      <View style={styles.container}>
        {lat != null ? (
          <View
            style={[
              styles.infoContainer,
              {
                top: 20,
                backgroundColor: isInsideZone ? greenColor : redColor,
                shadowColor: isInsideZone ? greenColor : redColor,
              },
            ]}>
            <Text style={{color: 'white', fontSize: 16, fontWeight: '700'}}>
              {`${isInsideZone ? 'Inside' : 'Outside'} Zone`}
            </Text>
          </View>
        ) : (
          <></>
        )}
        {lat != null ? (
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            loadingEnabled
            loadingIndicatorColor={primaryColor as string}
            loadingBackgroundColor={whiteColor as string}
            initialRegion={{
              latitude: lat,
              longitude: lng!,
              latitudeDelta: 0.001,
              longitudeDelta: 0.001,
            }}
            onMapReady={onMapReady}
            showsUserLocation={showUserLocation}
            followsUserLocation>
            <Marker
              coordinate={{
                latitude: lat,
                longitude: lng!,
                // latitude: parseFloat(store?.latitude),
                // longitude: parseFloat(store?.longitude),
              }}>
              <Callout>
                <Text style={{color: blackColor, fontSize: 14}}>
                  Allowed Zonasi
                </Text>
              </Callout>
            </Marker>
            <Circle
              radius={50}
              center={{
                latitude: lat,
                longitude: lng!,
                // latitude: parseFloat(store?.latitude),
                // longitude: parseFloat(store?.longitude),
              }}
              strokeWidth={1}
              strokeColor={redColor as string}
              fillColor={redRGBAColor as string}
            />
          </MapView>
        ) : (
          <View
            style={{
              width: '100%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: bgColor2,
            }}>
            <ActivityIndicator color={primaryColor} size={'small'} />
          </View>
        )}
      </View>
      <View
        style={{
          position: 'absolute',
          width: '100%',
          bottom: 0,
          paddingVertical: 10,
          paddingHorizontal: 16,
          backgroundColor: 'transparent',
        }}>
        <Button
          title={'Next'}
          disabled={!isInsideZone}
          onPress={() =>
            navigation.navigate('StorePhoto', {store, loc: {lat, lng}})
          }
        />
      </View>
    </View>
  );
};

export default StoreZonation;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: bgColor2,
  },
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
    backgroundColor: bgColor2,
  },
  infoContainer: {
    position: 'absolute',
    zIndex: 10,
    width: '40%',
    height: 40,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
});
