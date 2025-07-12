/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  ActivityIndicator,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  bgColor2,
  blackTextStyle,
  borderColor,
  FontFamily,
  primaryColor,
  whiteColor,
} from '../../constant/theme';
import {FocusAwareStatusBar, Gap, Header} from '../../components';
import {useAppDispatch} from '../../redux/hooks';
import {useIsFocused} from '@react-navigation/native';
import {getAttendanceReportDetailAction} from '../../redux/action/attendance';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {setDateView, wait} from '../../utils/helper';
// import {mapHelper} from '../../utils/helper';

// '106.720126';
// '-6.2953747';

const AttendanceReportDetail = ({navigation, route}: any) => {
  const {attendance_date} = route.params ?? {};
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [attendance, setAttendance] = useState<any>(null);
  const {width, height} = useWindowDimensions();
  const ASPECT_RATIO = width / height;

  //   const lat = parseFloat(mapHelper.centroid.latitude);
  //   const lng = parseFloat(mapHelper.centroid.longitude);
  //   const northeastLat = parseFloat(mapHelper.boundingBox.northEast.latitude);
  //   const southwestLat = parseFloat(mapHelper.boundingBox.southWest.latitude);
  const latDelta = 0.0922;
  const lngDelta = latDelta * ASPECT_RATIO;

  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();

  useEffect(() => {
    isFocused && getReportDetail();
  }, []);

  async function getReportDetail() {
    try {
      const res = await dispatch(
        getAttendanceReportDetailAction(attendance_date),
      );
      const data = res?.result[0];
      // console.log(data);
      setAttendance(data);
    } catch (err) {
      console.log(err);
    }
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => {
      getReportDetail();
      setRefreshing(false);
    });
  }, []);
  return (
    <View style={styles.page}>
      <FocusAwareStatusBar
        backgroundColor={bgColor2}
        barStyle={'dark-content'}
      />
      <Header title="Presence Detail" onPress={() => navigation.goBack()} />
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 4,
          paddingBottom: 50,
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.contentContainer}>
          <View style={styles.topContent}>
            <View style={{width: '59%'}}>
              <Text
                style={[blackTextStyle, {fontFamily: FontFamily.poppinsBold}]}>
                {attendance?.sales_name}
              </Text>
            </View>
            <View style={{width: '39%', alignItems: 'flex-end'}}>
              <Text style={[blackTextStyle]}>
                {setDateView(attendance?.created_date, 'DD-MM-YYYY')}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={{width: '49%'}}>
              <Text style={[blackTextStyle]}>Clock In</Text>
              <Text
                style={[
                  blackTextStyle,
                  {fontFamily: FontFamily.poppinsSemiBold},
                ]}>
                {setDateView(attendance?.incoming_attendance, 'HH:mm')}
              </Text>
            </View>
            <View style={{width: '49%'}}>
              <Text style={[blackTextStyle]}>Clock Out</Text>
              <Text
                style={[
                  blackTextStyle,
                  {fontFamily: FontFamily.poppinsSemiBold},
                ]}>
                {setDateView(attendance?.repeat_attendance, 'HH:mm')}
              </Text>
            </View>
          </View>
          <Gap height={16} />
          <Text
            style={[blackTextStyle, {fontFamily: FontFamily.poppinsSemiBold}]}>
            Photo
          </Text>
          <Gap height={4} />
          <View
            style={{
              width: '100%',
              height: height * 0.3,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={{width: '47%'}}>
              <Image
                source={{uri: attendance?.photo_base64_incoming}}
                style={{width: '100%', height: '100%', borderRadius: 16}}
                resizeMode="cover"
              />
            </View>
            <View style={{width: '47%'}}>
              {attendance?.photo_base64_repeat !== null ? (
                <Image
                  source={{uri: attendance?.photo_base64_repeat}}
                  style={{width: '100%', height: '100%', borderRadius: 16}}
                  resizeMode="cover"
                />
              ) : (
                <View>
                  <Text style={[blackTextStyle, {textAlign: 'center'}]}>
                    Clock Out Not Found
                  </Text>
                </View>
              )}
            </View>
          </View>
          <Gap height={16} />
          <Text
            style={[blackTextStyle, {fontFamily: FontFamily.poppinsSemiBold}]}>
            Location
          </Text>
          <Gap height={4} />
          {/* // NOTE: MAP */}
          <View style={styles.container}>
            <View
              style={{
                width: '100%',
                height: '100%',
                borderRadius: 16,
                overflow: 'hidden',
              }}>
              {attendance?.incoming_latitude !== null &&
              attendance?.incoming_longitude ? (
                <MapView
                  provider={PROVIDER_GOOGLE}
                  style={styles.map}
                  loadingEnabled={true}
                  loadingIndicatorColor={primaryColor as string}
                  loadingBackgroundColor={whiteColor as string}
                  initialRegion={{
                    latitude: parseFloat(attendance?.incoming_latitude),
                    longitude: parseFloat(attendance?.incoming_longitude),
                    latitudeDelta: latDelta,
                    longitudeDelta: lngDelta,
                  }}>
                  <Marker
                    coordinate={{
                      latitude: parseFloat(attendance?.incoming_latitude),
                      longitude: parseFloat(attendance?.incoming_longitude),
                    }}
                  />
                  {attendance?.repeat_latitude !== null &&
                  attendance?.repeat_longitude !== null ? (
                    <Marker
                      coordinate={{
                        latitude: parseFloat(attendance?.repeat_latitude),
                        longitude: parseFloat(attendance?.repeat_longitude),
                      }}
                    />
                  ) : (
                    <></>
                  )}
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
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default AttendanceReportDetail;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: bgColor2,
  },
  container: {
    width: '100%',
    height: 100,
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderRadius: 16,
  },
  contentContainer: {
    padding: 16,
    backgroundColor: whiteColor,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: borderColor,
    marginBottom: 10,
  },
  topContent: {
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderColor: borderColor,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  map: {
    width: '100%',
    height: '100%',
    backgroundColor: bgColor2,
  },
});
