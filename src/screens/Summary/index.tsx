/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {RefreshControl, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {layout} from '../../constant/style';
import {FocusAwareStatusBar, Gap, Header} from '../../components';
import {
  bgColor2,
  blackTextStyle,
  borderColor,
  FontFamily,
  greenColor,
  greySecondaryColor,
  primaryRGBAColor,
  whiteColor,
} from '../../constant/theme';
import IcMaterialCom from 'react-native-vector-icons/MaterialCommunityIcons';
import {PieChart} from 'react-native-gifted-charts';
import {useAppDispatch} from '../../redux/hooks';
import {useIsFocused} from '@react-navigation/native';
import {
  getDashboardAttendanceAction,
  getDashboardDailyActivitiesAction,
  getDashboardStoreVisitMonthlyAction,
} from '../../redux/action/dashboard';
import {wait} from '../../utils/helper';

const pieData = [{value: 0, color: primaryRGBAColor as string}];

const Summary = ({navigation}: any) => {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [storeVisitMonthly, setStoreVisitMonthly] = useState<any>(null);
  const [dailyActivities, setDailyActivities] = useState<any>(null);
  const [attendance, setAttendance] = useState<any>(null);
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();

  useEffect(() => {
    isFocused && getDashboard();
  }, [isFocused]);

  async function getDashboard() {
    try {
      const resDaily = await dispatch(getDashboardDailyActivitiesAction());
      const resStoreMonthly = await dispatch(
        getDashboardStoreVisitMonthlyAction(),
      );
      const resAttendance = await dispatch(getDashboardAttendanceAction());
      setDailyActivities(resDaily);
      setStoreVisitMonthly(resStoreMonthly);
      setAttendance(resAttendance);
    } catch (err) {
      console.log(err);
    }
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => {
      getDashboard();
      setRefreshing(false);
    });
  }, []);

  const renderLabel = () => {
    return (
      <Text style={{fontSize: 30}}>
        {storeVisitMonthly?.percent_done ?? '0'}%
      </Text>
    );
  };

  return (
    <View style={layout.page}>
      <FocusAwareStatusBar
        backgroundColor={bgColor2}
        barStyle={'dark-content'}
      />
      <Header title="Summary" onPress={() => navigation.goBack()} />
      <ScrollView
        style={{flex: 1}}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 50,
          paddingTop: 10,
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Text
          style={[
            blackTextStyle,
            {fontSize: 16, fontFamily: FontFamily.poppinsBold},
          ]}>
          Today Activities
        </Text>
        <Gap height={8} />
        <View style={styles.container}>
          <View style={styles.row}>
            <View style={{width: '49%'}}>
              <Text style={[blackTextStyle]}>Clock In</Text>
            </View>
            <View style={{width: '49%', alignItems: 'flex-end'}}>
              {attendance?.done_clock_in ? (
                <IcMaterialCom
                  name="check-circle"
                  size={20}
                  color={greenColor}
                />
              ) : (
                <IcMaterialCom
                  name="check-circle"
                  size={20}
                  color={greySecondaryColor}
                />
              )}
            </View>
          </View>
          <Gap height={10} />
          <View style={styles.row}>
            <View style={{width: '49%'}}>
              <Text style={[blackTextStyle]}>Clock Out</Text>
            </View>
            <View style={{width: '49%', alignItems: 'flex-end'}}>
              {attendance?.done_clock_out ? (
                <IcMaterialCom
                  name="check-circle"
                  size={20}
                  color={greenColor}
                />
              ) : (
                <IcMaterialCom
                  name="check-circle"
                  size={20}
                  color={greySecondaryColor}
                />
              )}
            </View>
          </View>
          <Gap height={10} />
          <View style={styles.line} />
          <Gap height={10} />
          <View style={styles.row}>
            <View style={{width: '49%'}}>
              <Text style={[blackTextStyle]}>Store Visit</Text>
            </View>
            <View style={{width: '49%', alignItems: 'flex-end'}}>
              <Text
                style={[
                  blackTextStyle,
                  {fontFamily: FontFamily.poppinsSemiBold},
                ]}>
                {dailyActivities?.total_visit ?? '0'}
              </Text>
            </View>
          </View>
          <Gap height={10} />
          <View style={styles.row}>
            <View style={{width: '49%'}}>
              <Text style={[blackTextStyle]}>Pricing</Text>
            </View>
            <View style={{width: '49%', alignItems: 'flex-end'}}>
              <Text
                style={[
                  blackTextStyle,
                  {fontFamily: FontFamily.poppinsSemiBold},
                ]}>
                {dailyActivities?.total_pricing ?? '0'}
              </Text>
            </View>
          </View>
          <Gap height={10} />
          <View style={styles.row}>
            <View style={{width: '49%'}}>
              <Text style={[blackTextStyle]}>OSA</Text>
            </View>
            <View style={{width: '49%', alignItems: 'flex-end'}}>
              <Text
                style={[
                  blackTextStyle,
                  {fontFamily: FontFamily.poppinsSemiBold},
                ]}>
                {dailyActivities?.total_stock ?? '0'}
              </Text>
            </View>
          </View>
        </View>
        <Gap height={24} />
        <Text
          style={[
            blackTextStyle,
            {fontSize: 16, fontFamily: FontFamily.poppinsBold},
          ]}>
          Store Visit Monthly
        </Text>
        <Gap height={8} />
        <View
          style={[
            styles.container,
            {alignItems: 'center', justifyContent: 'center'},
          ]}>
          {storeVisitMonthly ? (
            <PieChart
              donut
              innerRadius={80}
              data={storeVisitMonthly?.data_percent}
              centerLabelComponent={renderLabel}
            />
          ) : (
            <PieChart
              donut
              innerRadius={80}
              data={pieData}
              centerLabelComponent={renderLabel}
            />
          )}
          <Gap height={10} />
          <View style={styles.line} />
          <Gap height={10} />
          <View style={[styles.row]}>
            <View style={{width: '49%', alignItems: 'center'}}>
              <Text style={[blackTextStyle, {fontSize: 12}]}>Done</Text>
              <Text
                style={[
                  blackTextStyle,
                  {fontSize: 18, fontFamily: FontFamily.poppinsSemiBold},
                ]}>
                {storeVisitMonthly?.total_visit ?? '0'}
              </Text>
            </View>
            <View style={{width: '49%', alignItems: 'center'}}>
              <Text style={[blackTextStyle, {fontSize: 12}]}>Target</Text>
              <Text
                style={[
                  blackTextStyle,
                  {fontSize: 18, fontFamily: FontFamily.poppinsSemiBold},
                ]}>
                {storeVisitMonthly?.target_visit ?? '0'}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Summary;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 24,
    backgroundColor: whiteColor,
    borderRadius: 20,
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: borderColor,
  },
});
