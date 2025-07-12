/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  Modal,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  Button,
  Dropdown,
  FocusAwareStatusBar,
  Gap,
  Header,
} from '../../components';
import {
  bgColor2,
  blackColor,
  blackRGBAColor,
  blackTextStyle,
  blueColor,
  borderColor,
  FontFamily,
  greenRGBAColor,
  greyRGBAColor,
  greyTextStyle,
  primaryColor,
  redTextStyle,
  whiteColor,
} from '../../constant/theme';
import {useAppDispatch} from '../../redux/hooks';
import {useIsFocused} from '@react-navigation/native';
import {getAttendanceReportAction} from '../../redux/action/attendance';
import {FlashList} from '@shopify/flash-list';
import {setDateView, wait} from '../../utils/helper';
import {lottieFiles} from '../../assets';
import LottieView from 'lottie-react-native';
import {useSelector} from 'react-redux';
// import IcMaterialCom from 'react-native-vector-icons/MaterialCommunityIcons';
import {shadow} from '../../constant/style';
import {bulan, tahun} from '../../utils/dummy';

const AttendanceReport = ({navigation}: any) => {
  const d = new Date();
  const m = d.getMonth() + 1;
  const y = d.getFullYear();
  const [isFiltered, setIsFiltered] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [modalFilterVisible, setModalFilterVisible] = useState<boolean>(false);
  const [labelBulan, setLabelBulan] = useState('BULAN');
  const [labelTahun, setLabelTahun] = useState('TAHUN');
  const [chooseBulan, setChooseBulan] = useState(m);
  const [chooseTahun, setChooseTahun] = useState(y);
  const [isModalVisibleBulan, setIsModalVisibleBulan] = useState(false);
  const [isModalVisibleTahun, setIsModalVisibleTahun] = useState(false);
  const [filter, setFilter] = useState({
    month: chooseBulan == null ? m : chooseBulan,
    year: chooseTahun == null ? y : chooseTahun,
  });

  const [listReport, setListReport] = useState([]);
  const {isLoading} = useSelector((state: any) => state.globalReducer);

  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();

  useEffect(() => {
    isFocused && getAttendanceReport();
  }, [isFocused, filter?.month, filter?.year]);

  async function getAttendanceReport() {
    try {
      const res = await dispatch(
        getAttendanceReportAction(filter.month, filter.year),
      );
      // console.log(res.result);
      setListReport(res?.result);
    } catch (err: any) {
      console.log(err);
    }
  }

  const keyExtractor = useCallback(
    (item: any, i: any) => `${i}-${item.id}`,
    [],
  );

  const renderEmptyComponent = () => {
    if (isLoading) {
      return <></>;
    }
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View style={{width: '100%', height: 200}}>
          <LottieView
            source={lottieFiles.emptyLoading}
            autoPlay
            loop
            style={{width: '100%', height: '100%'}}
          />
        </View>
        <Text
          style={[blackTextStyle, {fontFamily: FontFamily.poppinsSemiBold}]}>
          No data
        </Text>
      </View>
    );
  };

  const renderItemFlashlist = ({item}: {item: any}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() =>
          navigation.navigate('AttendanceReportDetail', {
            attendance_date: setDateView(item?.created_date, 'YYYY-MM-DD'),
          })
        }
        style={styles.cardContainer}>
        <View style={styles.row}>
          <View style={{width: '39%', flexDirection: 'row'}}>
            {/* <IcMaterialCom name="calendar" size={16} color={blackColor} /> */}
            {/* <Gap width={4} /> */}
            <Text style={[blackTextStyle, {fontSize: 12}]}>Presence Date</Text>
          </View>
          <View
            style={{
              width: '60%',
              alignItems: 'flex-end',
            }}>
            <Text style={[greyTextStyle, {fontSize: 10}]}>
              {setDateView(item.created_date, 'dddd, DD-MM-YYYY')}
            </Text>
          </View>
        </View>
        <Gap height={4} />
        <View style={styles.nameContainer}>
          <Text
            style={[
              blackTextStyle,
              {
                fontSize: 12,
                fontFamily: FontFamily.poppinsSemiBold,
                textAlign: 'center',
              },
            ]}>
            {item.sales_name}
          </Text>
        </View>
        <Gap height={8} />
        <View style={styles.row}>
          <View style={styles.timeContainer}>
            <Text style={[blackTextStyle, {fontSize: 12}]}>Clock In</Text>
            <Text
              style={[
                blackTextStyle,
                {fontSize: 12, fontFamily: FontFamily.poppinsSemiBold},
              ]}>
              {setDateView(item.incoming_attendance, 'HH:mm')}
            </Text>
          </View>
          <View style={styles.timeContainer}>
            <Text style={[blackTextStyle, {fontSize: 12}]}>Clock Out</Text>
            <Text
              style={[
                blackTextStyle,
                {fontSize: 12, fontFamily: FontFamily.poppinsSemiBold},
              ]}>
              {setDateView(item.repeat_attendance, 'HH:mm')}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  async function handleFilter() {
    try {
      console.log('FILTER');
      setIsFiltered(true);
      setFilter({
        month: chooseBulan,
        year: chooseTahun,
      });
    } catch (err) {
      console.log(err);
    } finally {
      setModalFilterVisible(false);
    }
  }
  async function resetFilter() {
    try {
      console.log('FILTER');
      setIsFiltered(false);
      const dd = new Date();
      const mm = dd.getMonth() + 1;
      const yy = dd.getFullYear();
      setFilter({month: mm, year: yy});
    } catch (err) {
      console.log(err);
    } finally {
      setModalFilterVisible(false);
    }
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => {
      getAttendanceReport();
      setRefreshing(false);
    });
  }, []);

  // MODAL DROPDOWN
  const changeModalVisibilityBulan = (bool: boolean) => {
    setIsModalVisibleBulan(bool);
  };
  const changeModalVisibilityTahun = (bool: boolean) => {
    setIsModalVisibleTahun(bool);
  };
  const setDataBulan = (option: any, label: any) => {
    setChooseBulan(option);
    setLabelBulan(label);
  };
  const setDataTahun = (option: any, label: any) => {
    setChooseTahun(option);
    setLabelTahun(label);
  };
  return (
    <View style={[styles.page]}>
      <FocusAwareStatusBar
        backgroundColor={bgColor2}
        barStyle={'dark-content'}
      />
      <Header
        title="Presence Report"
        isIconActive
        isDotActive={isFiltered}
        iconColor2={isFiltered ? blueColor : blackColor}
        onPress={() => navigation.goBack()}
        onPressIcon={() => setModalFilterVisible(true)}
      />
      <View style={{flex: 1}}>
        <FlashList
          data={listReport}
          keyExtractor={keyExtractor}
          renderItem={renderItemFlashlist}
          ListEmptyComponent={renderEmptyComponent}
          estimatedItemSize={50}
          contentContainerStyle={{
            paddingHorizontal: 14,
            paddingTop: 8,
            paddingBottom: 20,
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
      {/* // NOTE: MODAL FILTER */}
      <Modal animationType="slide" transparent visible={modalFilterVisible}>
        <TouchableWithoutFeedback>
          <View style={styles.modalContainer}>
            <View style={[shadow, styles.modalContent]}>
              {isFiltered === true ? (
                <TouchableOpacity activeOpacity={0.7} onPress={resetFilter}>
                  <Text style={[redTextStyle]}>Reset Filter</Text>
                </TouchableOpacity>
              ) : (
                <></>
              )}
              <Text style={[blackTextStyle]}>Month</Text>
              <Gap height={2} />
              <Dropdown
                visible={isModalVisibleBulan}
                data={bulan}
                label={labelBulan}
                height={40}
                setLabel={setLabelBulan}
                setData={setDataBulan}
                changeModalVisibility={changeModalVisibilityBulan}
              />
              <Gap height={8} />
              <Text style={[blackTextStyle]}>Year</Text>
              <Gap height={2} />
              <Dropdown
                visible={isModalVisibleTahun}
                data={tahun}
                label={labelTahun}
                height={40}
                setLabel={setLabelTahun}
                setData={setDataTahun}
                changeModalVisibility={changeModalVisibilityTahun}
              />
              <Gap height={24} />
              <Button title="Filter" onPress={handleFilter} />
              <Gap height={2} />
              <Button
                title="Close"
                titleColor={primaryColor}
                bgColor={'transparent'}
                onPress={() => setModalFilterVisible(false)}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default AttendanceReport;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: bgColor2,
  },
  cardContainer: {
    width: '100%',
    padding: 16,
    borderRadius: 16,
    backgroundColor: whiteColor,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: borderColor,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nameContainer: {
    width: '100%',
    backgroundColor: greenRGBAColor,
    borderWidth: 1,
    borderColor: borderColor,
    borderRadius: 16,
    paddingVertical: 2,
    alignItems: 'center',
  },
  timeContainer: {
    width: '49%',
    alignItems: 'center',
    backgroundColor: greyRGBAColor,
    borderWidth: 1,
    borderColor: borderColor,
    borderRadius: 16,
    paddingVertical: 4,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: blackRGBAColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    width: '80%',
    padding: 16,
    borderRadius: 16,
    backgroundColor: whiteColor,
  },
});
