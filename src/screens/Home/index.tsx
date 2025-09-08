/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {FocusAwareStatusBar, Gap} from '../../components';
import {
  bgColor2,
  blackTextStyle,
  FontFamily,
  greyTextStyle,
  primaryColor,
  primaryRGBAColor,
  redColor,
  whiteSecondaryColor,
} from '../../constant/theme';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ProfilePhoto} from '../../assets';
import {setDateView} from '../../utils/helper';
import {layout} from '../../constant/style';
import {useAppDispatch} from '../../redux/hooks';
import {logoutAction} from '../../redux/action/auth';
import {storage} from '../../utils/storage';
import {useIsFocused} from '@react-navigation/native';
import {getPricingMechanismAction} from '../../redux/action/product';

const d = new Date();

const Home = ({navigation}: any) => {
  const [username, setUsername] = useState<string>('');
  const {height} = useWindowDimensions();

  const isFocused = useIsFocused();
  const dispatch = useAppDispatch();

  useEffect(() => {
    isFocused && getUser();
    isFocused && getMechanism();
  }, [isFocused]);

  async function getMechanism() {
    try {
      await dispatch(getPricingMechanismAction());
    } catch (err) {
      console.log(err);
    }
  }

  async function getUser() {
    try {
      const fullname = await storage.getString('fullName');
      setUsername(fullname ?? '-');
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <View style={layout.page}>
      <FocusAwareStatusBar
        backgroundColor={bgColor2}
        barStyle={'dark-content'}
      />
      <ScrollView
        style={{flex: 1}}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 20,
          paddingBottom: 50,
          paddingHorizontal: 16,
        }}>
        {/* // NOTE: TOP CONTENT */}
        <View
          style={[
            {
              flexDirection: 'row',
              width: '100%',
              backgroundColor: 'transparent',
              paddingVertical: 16,
            },
          ]}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={{
              width: '85%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={{width: '30%', height: 80}}>
              <Image
                source={ProfilePhoto}
                style={{width: 80, height: 80, borderRadius: 80}}
              />
            </View>
            <View style={{width: '69%'}}>
              <Text
                style={[
                  blackTextStyle,
                  {fontFamily: FontFamily.poppinsRegular, fontSize: 18},
                ]}>
                Howdy,
              </Text>
              <Text
                style={[
                  blackTextStyle,
                  {
                    fontFamily: FontFamily.poppinsSemiBold,
                    fontSize: 18,
                    textTransform: 'capitalize',
                  },
                ]}
                numberOfLines={2}>
                {username}!
              </Text>
            </View>
          </TouchableOpacity>
          <View
            style={{
              width: '15%',
              alignItems: 'flex-end',
            }}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => dispatch(logoutAction(navigation))}
              style={{
                width: 40,
                height: 40,
                borderRadius: 8,
                backgroundColor: whiteSecondaryColor,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <MaterialIcon name="logout" size={24} color={redColor} />
            </TouchableOpacity>
          </View>
        </View>
        <Gap height={16} />
        <View
          style={[
            {
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
            },
          ]}>
          <Text
            style={[
              blackTextStyle,
              {fontSize: 16, fontFamily: FontFamily.poppinsSemiBold},
            ]}>
            Main Menu
          </Text>
          <Gap width={4} />
          <Text style={greyTextStyle}>
            {setDateView(d, 'dddd, DD-MM-YYYY')}
          </Text>
        </View>
        <Gap height={16} />
        {/* // NOTE: MAIN MENU */}
        <View style={styles.row}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('Attendance')}
            style={{
              width: '47%',
              alignItems: 'center',
            }}>
            <View style={[styles.cardContainer, {minHeight: height * 0.2}]}>
              <MaterialIcon
                name={'calendar-month'}
                size={80}
                color={primaryColor}
              />
            </View>
            <Gap height={4} />
            <Text
              style={[
                blackTextStyle,
                {fontFamily: FontFamily.poppinsSemiBold},
              ]}>
              Attendance
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('PricingList')}
            style={{
              width: '47%',
              alignItems: 'center',
            }}>
            <View style={[styles.cardContainer, {minHeight: height * 0.2}]}>
              <MaterialIcon name={'tag'} size={80} color={primaryColor} />
            </View>
            <Gap height={4} />
            <Text
              style={[
                blackTextStyle,
                {fontFamily: FontFamily.poppinsSemiBold},
              ]}>
              Pricing
            </Text>
          </TouchableOpacity>
        </View>
        <Gap height={16} />
        <View style={styles.row}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('StoreVisit')}
            style={{
              width: '47%',
              alignItems: 'center',
            }}>
            <View style={[styles.cardContainer, {minHeight: height * 0.2}]}>
              <MaterialIcon
                name={'map-marker-radius'}
                size={80}
                color={primaryColor}
              />
            </View>
            <Gap height={4} />
            <Text
              style={[
                blackTextStyle,
                {fontFamily: FontFamily.poppinsSemiBold},
              ]}>
              Store Visit
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('OSA')}
            style={{
              width: '47%',
              alignItems: 'center',
            }}>
            <View style={[styles.cardContainer, {minHeight: height * 0.2}]}>
              <MaterialIcon
                name={'library-shelves'}
                size={80}
                color={primaryColor}
              />
            </View>
            <Gap height={4} />
            <Text
              style={[
                blackTextStyle,
                {
                  fontFamily: FontFamily.poppinsSemiBold,
                  textAlign: 'center',
                },
              ]}>
              On Shelf Availability
            </Text>
          </TouchableOpacity>
        </View>
        <Gap height={16} />
        {/* // NOTE: SUMMARY */}
        <Text
          style={[
            blackTextStyle,
            {fontSize: 16, fontFamily: FontFamily.poppinsSemiBold},
          ]}>
          Your Summary
        </Text>
        <Gap height={8} />
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.navigate('Summary')}
          style={[styles.cardSummaryContainer]}>
          <MaterialIcon
            name="chart-donut-variant"
            size={32}
            color={primaryColor}
          />
          <Gap width={8} />
          <Text
            style={[blackTextStyle, {fontFamily: FontFamily.poppinsSemiBold}]}>
            Summary Activity
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: bgColor2,
  },
  padding: {
    paddingHorizontal: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: primaryRGBAColor,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: primaryColor,
  },
  iconCard: {
    width: 48,
    height: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerCard: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 'auto',
    flexDirection: 'row',
  },
  cardSummaryContainer: {
    width: '100%',
    flexDirection: 'row',
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: primaryRGBAColor,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: primaryColor,
  },
});
