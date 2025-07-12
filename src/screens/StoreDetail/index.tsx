/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  StyleSheet,
  // Image,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  bgColor2,
  blackColor,
  blackRGBAColor,
  blackTextStyle,
  borderColor,
  FontFamily,
  greyColor,
  primaryColor,
  whiteColor,
  whiteTextStyle,
} from '../../constant/theme';
import {Button, FocusAwareStatusBar, Gap, Header} from '../../components';
// import {StoreImg} from '../../assets';
import {useAppDispatch} from '../../redux/hooks';
import {setToast} from '../../redux/action/global';
import IcMaterialCom from 'react-native-vector-icons/MaterialCommunityIcons';
import {layout, shadow} from '../../constant/style';
import {setDateView} from '../../utils/helper';
import {StackActions, useIsFocused} from '@react-navigation/native';
import {getStoreVisitAction} from '../../redux/action/storeVisit';
import {StoreImg} from '../../assets';

const d = new Date();

const StoreDetail = ({navigation, route}: any) => {
  const {store} = route.params ?? {};
  const {width, height} = useWindowDimensions();
  const [storeVisit, setStoreVisit] = useState<any[]>([]);
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();

  useEffect(() => {
    isFocused && getStore();
  }, [isFocused]);

  async function getStore() {
    try {
      const res = await dispatch(getStoreVisitAction(store?.store_id));
      // console.log(res);
      setStoreVisit(res?.result);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <View style={layout.page}>
      <FocusAwareStatusBar
        backgroundColor={primaryColor}
        barStyle={'light-content'}
      />
      <Header
        title={store?.store_name}
        titleColor={whiteTextStyle}
        iconColor={whiteColor}
        bgColor={primaryColor as string}
        onPress={() => navigation.goBack()}
      />
      {/* // NOTE: STORE PHOTO */}
      <View style={{width: width, height: height * 0.3}}>
        {storeVisit?.length > 0 ? (
          <>
            {storeVisit[0]?.photo_base64_visit !== null ? (
              <>
                <Image
                  source={{uri: storeVisit[0]?.photo_base64_visit}}
                  style={{width: '100%', height: '100%'}}
                  resizeMode="cover"
                />
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => navigation.navigate('StoreZonation', {store})}
                  style={[shadow, styles.imageStore]}>
                  <IcMaterialCom
                    name={'camera'}
                    size={24}
                    color={primaryColor}
                  />
                </TouchableOpacity>
              </>
            ) : (
              <Image
                source={StoreImg}
                style={{width: '100%', height: '100%'}}
                resizeMode="cover"
              />
            )}
          </>
        ) : (
          <>
            <View
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: greyColor,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <IcMaterialCom name={'image'} size={64} color={whiteColor} />
              <Text style={[whiteTextStyle]}>Image not available</Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate('StoreZonation', {store})}
              style={[shadow, styles.imageStore]}>
              <IcMaterialCom name={'camera'} size={24} color={primaryColor} />
            </TouchableOpacity>
          </>
        )}
      </View>
      <Gap height={32} />
      <View style={layout.paddingH}>
        <View style={styles.rowContainer}>
          <View style={styles.iconContent}>
            <IcMaterialCom name="map-marker" size={16} color={blackColor} />
          </View>
          <View style={{width: '83%'}}>
            <View style={styles.contentHeader}>
              <View style={{width: '49%', alignItems: 'center'}}>
                <Text style={[blackTextStyle]}>Latitude</Text>
              </View>
              <View style={{width: '49%', alignItems: 'center'}}>
                <Text style={[blackTextStyle]}>Longitude</Text>
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={{width: '49%', alignItems: 'center'}}>
                <Text
                  style={[
                    blackTextStyle,
                    {fontFamily: FontFamily.poppinsSemiBold},
                  ]}>
                  {parseFloat(
                    storeVisit?.length > 0
                      ? storeVisit[0]?.latitude
                      : store?.latitude,
                  )}
                </Text>
              </View>
              <View style={{width: '49%', alignItems: 'center'}}>
                <Text
                  style={[
                    blackTextStyle,
                    {fontFamily: FontFamily.poppinsSemiBold},
                  ]}>
                  {parseFloat(
                    storeVisit?.length > 0
                      ? storeVisit[0]?.longitude
                      : store?.longitude,
                  )}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <Gap height={16} />
        <View style={styles.rowContainer}>
          <View style={styles.iconContent}>
            <IcMaterialCom name="clock" size={16} color={blackColor} />
          </View>
          <View style={{width: '83%'}}>
            <View style={styles.contentHeader}>
              <View style={{width: '49%', alignItems: 'center'}}>
                <Text style={[blackTextStyle]}>Date</Text>
              </View>
              <View style={{width: '49%', alignItems: 'center'}}>
                <Text style={[blackTextStyle]}>Time</Text>
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={{width: '49%', alignItems: 'center'}}>
                <Text
                  style={[
                    blackTextStyle,
                    {fontFamily: FontFamily.poppinsSemiBold},
                  ]}>
                  {setDateView(
                    storeVisit?.length > 0 ? storeVisit[0]?.visit_date : d,
                    'DD-MM-YYYY',
                  )}
                </Text>
              </View>
              <View style={{width: '49%', alignItems: 'center'}}>
                <Text
                  style={[
                    blackTextStyle,
                    {fontFamily: FontFamily.poppinsSemiBold},
                  ]}>
                  {setDateView(
                    storeVisit?.length > 0 ? storeVisit[0]?.updated_date : d,
                    'HH:mm:ss',
                  )}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      {/* // NOTE: BUTTON */}
      <View style={styles.footer}>
        <View style={{width: '48%'}}>
          <Button
            title="No Visit"
            titleColor={primaryColor}
            bgColor={bgColor2}
            borderWidth={2}
            borderColor={primaryColor}
            onPress={async () => {
              await dispatch(
                setToast({
                  toastVisible: true,
                  toastType: 'success',
                  toastMessage: 'Store Not Visited!',
                  toastDuration: 2000,
                }),
              );
              navigation.dispatch(StackActions.popToTop);
            }}
          />
        </View>
        <View style={{width: '48%'}}>
          <Button
            title="Visit"
            onPress={() =>
              navigation.navigate('Report', {store_id: store?.store_id})
            }
          />
        </View>
      </View>
    </View>
  );
};

export default StoreDetail;

const styles = StyleSheet.create({
  imageStore: {
    position: 'absolute',
    bottom: -20,
    right: 10,
    width: 48,
    height: 48,
    borderRadius: 48 / 2,
    backgroundColor: whiteColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: whiteColor,
    borderRadius: 10,
    padding: 8,
  },
  iconContent: {
    width: '15%',
    height: 32,
    borderRadius: 32 / 2,
    backgroundColor: blackRGBAColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentHeader: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: borderColor,
    marginBottom: 4,
  },
  footer: {
    position: 'absolute',
    width: '100%',
    bottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});
