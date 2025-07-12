/* eslint-disable react-native/no-inline-styles */
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import React from 'react';
import {layout} from '../../constant/style';
import {FocusAwareStatusBar, Gap} from '../../components';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  bgColor2,
  blackColor,
  blackTextStyle,
  blueColor,
  blueRGBAColor,
  FontFamily,
  greenColor,
  greenRGBAColor,
  orangeColor,
  orangeRGBAColor,
  purpleColor,
  purpleRGBAColor,
  redColor,
  redRGBAColor,
  spaceColor,
  spaceRGBAColor,
  whiteColor,
  yellowColor,
  yellowRGBAColor,
} from '../../constant/theme';

const Attendance = ({navigation}: any) => {
  const {width} = useWindowDimensions();
  return (
    <View style={layout.page}>
      <FocusAwareStatusBar
        backgroundColor={bgColor2}
        barStyle={'dark-content'}
      />
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{paddingTop: 20, paddingBottom: 50}}>
        <View style={[styles.padding]}>
          <Text
            style={[
              blackTextStyle,
              {fontFamily: FontFamily.poppinsSemiBold, fontSize: 16},
            ]}>
            Your Activity
          </Text>
          <Gap height={16} />
          <View style={styles.row}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate('PresenceLoc', {type: 1})}
              style={[styles.cardContainer, {height: width / 3.3}]}>
              <View style={{height: '75%'}}>
                <View
                  style={[styles.iconCard, {backgroundColor: greenRGBAColor}]}>
                  <MaterialIcon name="clock-in" size={32} color={greenColor} />
                </View>
              </View>
              <View style={styles.footerCard}>
                <Text
                  style={{color: blackColor, fontWeight: '600', fontSize: 16}}>
                  Clock In
                </Text>
                <MaterialIcon
                  name="chevron-right"
                  size={24}
                  color={blackColor}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate('PresenceLoc', {type: 2})}
              style={[styles.cardContainer, {height: width / 3.3}]}>
              <View style={{height: '75%'}}>
                <View
                  style={[styles.iconCard, {backgroundColor: purpleRGBAColor}]}>
                  <MaterialIcon
                    name="clock-out"
                    size={32}
                    color={purpleColor}
                  />
                </View>
              </View>
              <View style={styles.footerCard}>
                <Text
                  style={{color: blackColor, fontWeight: '600', fontSize: 16}}>
                  Clock Out
                </Text>
                <MaterialIcon
                  name="chevron-right"
                  size={24}
                  color={blackColor}
                />
              </View>
            </TouchableOpacity>
          </View>
          <Gap height={16} />
          <View style={styles.row}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={[styles.cardContainer, {height: width / 3.3}]}>
              <View style={{height: '75%'}}>
                <View
                  style={[styles.iconCard, {backgroundColor: yellowRGBAColor}]}>
                  <MaterialIcon
                    name="hand-heart-outline"
                    size={32}
                    color={yellowColor}
                  />
                </View>
              </View>
              <View style={styles.footerCard}>
                <Text
                  style={{color: blackColor, fontWeight: '600', fontSize: 16}}>
                  Sick Leave
                </Text>
                <MaterialIcon
                  name="chevron-right"
                  size={24}
                  color={blackColor}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              style={[styles.cardContainer, {height: width / 3.3}]}>
              <View style={{height: '75%'}}>
                <View
                  style={[styles.iconCard, {backgroundColor: blueRGBAColor}]}>
                  <MaterialIcon
                    name="file-document"
                    size={32}
                    color={blueColor}
                  />
                </View>
              </View>
              <View style={styles.footerCard}>
                <Text
                  style={{color: blackColor, fontWeight: '600', fontSize: 16}}>
                  Permit
                </Text>
                <MaterialIcon
                  name="chevron-right"
                  size={24}
                  color={blackColor}
                />
              </View>
            </TouchableOpacity>
          </View>
          <Gap height={16} />
          <View style={styles.row}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={[styles.cardContainer, {height: width / 3.3}]}>
              <View style={{height: '75%'}}>
                <View
                  style={[styles.iconCard, {backgroundColor: redRGBAColor}]}>
                  <MaterialIcon
                    name="motion-sensor-off"
                    size={32}
                    color={redColor}
                  />
                </View>
              </View>
              <View style={styles.footerCard}>
                <Text
                  style={{color: blackColor, fontWeight: '600', fontSize: 16}}>
                  Off Day
                </Text>
                <MaterialIcon
                  name="chevron-right"
                  size={24}
                  color={blackColor}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              style={[styles.cardContainer, {height: width / 3.3}]}>
              <View style={{height: '75%'}}>
                <View
                  style={[styles.iconCard, {backgroundColor: orangeRGBAColor}]}>
                  <MaterialIcon
                    name="airplane-takeoff"
                    size={32}
                    color={orangeColor}
                  />
                </View>
              </View>
              <View style={styles.footerCard}>
                <Text
                  style={{color: blackColor, fontWeight: '600', fontSize: 16}}>
                  Leave
                </Text>
                <MaterialIcon
                  name="chevron-right"
                  size={24}
                  color={blackColor}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <Gap height={16} />
        <View style={[styles.padding]}>
          <Text
            style={[
              blackTextStyle,
              {fontFamily: FontFamily.poppinsSemiBold, fontSize: 16},
            ]}>
            Your Report
          </Text>
          <Gap height={8} />
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('AttendanceReport')}
            style={[styles.cardContainer, {width: '100%'}]}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  width: '90%',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View
                  style={[styles.iconCard, {backgroundColor: spaceRGBAColor}]}>
                  <MaterialIcon
                    name="account-box"
                    size={32}
                    color={spaceColor}
                  />
                </View>
                <Gap width={8} />
                <Text
                  style={{color: blackColor, fontWeight: '600', fontSize: 16}}>
                  Presence Report
                </Text>
              </View>
              <View
                style={{
                  width: '10%',
                  alignItems: 'flex-end',
                }}>
                <MaterialIcon
                  name="chevron-right"
                  size={24}
                  color={blackColor}
                />
              </View>
            </View>
            {/* <View style={styles.footerCard}>
              <Text
                style={{color: blackColor, fontWeight: '600', fontSize: 16}}>
                Attendance Report
              </Text>
              <MaterialIcon name="chevron-right" size={24} color={blackColor} />
            </View> */}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Attendance;

const styles = StyleSheet.create({
  padding: {
    paddingHorizontal: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardContainer: {
    width: '48%',
    backgroundColor: whiteColor,
    borderRadius: 12,
    padding: 16,
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
});
