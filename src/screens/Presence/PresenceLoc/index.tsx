/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  bgColor2,
  blackColor,
  primaryColor,
  whiteColor,
} from '../../../constant/theme';
import {Button, FocusAwareStatusBar} from '../../../components';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {shadow} from '../../../constant/style';
import useGetLocation from '../../../hooks/useGetLocation';

const PresenceLoc = ({navigation, route}: any) => {
  const {type} = route.params ?? {};
  const [disabled, setDisabled] = useState<boolean>(true);
  const [showUserLocation, setShowUserLocation] = useState(false);
  const {lat, lng} = useGetLocation();

  useEffect(() => {
    setDisabledAction();
  }, [lat, lng]);

  const setDisabledAction = useCallback(() => {
    try {
      if (lat != null || lng != null) {
        setDisabled(false);
      }
    } catch (err) {
      console.log(err);
    }
  }, [lat, lng]);

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
            paddingTop: 24,
            paddingBottom: 10,
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
          {type === 1 ? 'Clock In' : 'Clock Out'}
        </Text>
      </View>
      <View style={styles.container}>
        {lat != null ? (
          <MapView
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={styles.map}
            loadingEnabled
            loadingIndicatorColor={primaryColor as string}
            loadingBackgroundColor={whiteColor as string}
            initialRegion={{
              latitude: lat,
              longitude: lng!,
              // latitude: -6.1771474,
              // longitude: 106.8164246,
              latitudeDelta: 0.001,
              longitudeDelta: 0.001,
            }}
            onMapReady={onMapReady}
            showsUserLocation={showUserLocation}
            followsUserLocation
          />
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
          bottom: 10,
          paddingVertical: 10,
          paddingHorizontal: 16,
        }}>
        <Button
          title="Next"
          disabled={disabled}
          onPress={() =>
            navigation.navigate('PresencePhoto', {loc: {lat, lng}, type})
          }
        />
      </View>
    </View>
  );
};

export default PresenceLoc;

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
});
