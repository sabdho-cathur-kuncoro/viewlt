/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  bgColor2,
  blackColor,
  blackTextStyle,
  primaryColor,
  whiteColor,
} from '../../constant/theme';
import {FocusAwareStatusBar, Gap} from '../../components';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {shadow} from '../../constant/style';
import useGetLocation from '../../hooks/useGetLocation';
import {useIsFocused} from '@react-navigation/native';
import {useAppDispatch} from '../../redux/hooks';
import {getStoreAction} from '../../redux/action/storeVisit';
import {wait} from '../../utils/helper';

const StoreVisit = ({navigation}: any) => {
  const {lat, lng} = useGetLocation();
  const [store, setStore] = useState([]);
  const [showUserLocation, setShowUserLocation] = useState(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const isFocused = useIsFocused();
  const dispatch = useAppDispatch();

  useEffect(() => {
    isFocused && getStore();
  }, [isFocused]);

  async function getStore() {
    try {
      const res = await dispatch(getStoreAction());
      // console.log(res);
      setStore(res?.result);
    } catch (err) {
      console.log(err);
    }
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => {
      getStore();
      setRefreshing(false);
    });
  }, []);

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
            paddingHorizontal: 16,
            paddingTop: 20,
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
          Store Visit
        </Text>
      </View>
      <View style={styles.container}>
        {lat != null ? (
          <MapView
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            onMapReady={onMapReady}
            style={{width: '100%', height: '100%'}}
            loadingEnabled
            loadingIndicatorColor={primaryColor as string}
            loadingBackgroundColor={whiteColor as string}
            initialRegion={{
              latitude: lat,
              longitude: lng!,
              latitudeDelta: 0.001,
              longitudeDelta: 0.001,
            }}
            showsUserLocation={showUserLocation}
            showsMyLocationButton
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
      <Gap height={16} />
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{paddingHorizontal: 8}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {store?.length > 0 ? (
          store.map((data: any) => {
            return (
              <TouchableOpacity
                key={data.id}
                activeOpacity={0.7}
                onPress={() =>
                  navigation.navigate('StoreDetail', {store: data})
                }
                style={styles.cardStore}>
                <View style={{width: '100%'}}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <MaterialIcon name="store" size={18} color={blackColor} />
                    <Gap width={4} />
                    <Text style={[blackTextStyle]}>{data?.store_name}</Text>
                  </View>
                  <Gap height={4} />
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <MaterialIcon
                      name="map-marker-check"
                      size={18}
                      color={blackColor}
                    />
                    <Gap width={4} />
                    <Text style={[blackTextStyle, {fontSize: 12}]}>
                      {data?.city_name}, {data?.area_name}, {data?.region_name}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })
        ) : (
          <></>
        )}
        {/* <TouchableOpacity
          activeOpacity={0.7}
          style={{
            width: '100%',
            flexDirection: 'row',
            padding: 16,
            borderRadius: 8,
            backgroundColor: whiteColor,
            marginBottom: 10,
          }}>
          <View style={{width: '74%'}}>
            <Text style={[primaryTextStyle]}>Supermarket Dummy 2</Text>
            <Text style={[blackTextStyle]}>Lorem Ipsum</Text>
          </View>
          <View
            style={{
              width: '25%',
              alignItems: 'flex-end',
              justifyContent: 'flex-end',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <MaterialIcon
                name="map-marker-check"
                size={18}
                color={greenColor}
              />
              <Gap width={2} />
              <Text style={[blackTextStyle, {fontSize: 10}]}>Bogor</Text>
            </View>
          </View>
        </TouchableOpacity> */}
      </ScrollView>
    </View>
  );
};

export default StoreVisit;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: bgColor2,
  },
  container: {
    flex: 0.4,
    backgroundColor: bgColor2,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  cardStore: {
    width: '100%',
    flexDirection: 'row',
    padding: 16,
    borderRadius: 8,
    backgroundColor: whiteColor,
    marginBottom: 10,
  },
});
