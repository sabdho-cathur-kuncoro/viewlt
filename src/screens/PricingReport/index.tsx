/* eslint-disable radix */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {layout} from '../../constant/style';
import {
  Button,
  Dropdown,
  FocusAwareStatusBar,
  Gap,
  Header,
  ModalConfirmation,
} from '../../components';
import {
  bgColor,
  bgColor2,
  blackTextStyle,
  borderColor,
  FontFamily,
  greenColor,
  greyColor,
  whiteColor,
} from '../../constant/theme';
import IcMaterialCom from 'react-native-vector-icons/MaterialCommunityIcons';
import {setDateView, wait} from '../../utils/helper';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
// import {mekanisme} from '../../utils/dummy';
import {
  getPricingMechanismAction,
  postProductPriceAction,
} from '../../redux/action/product';
import {storage} from '../../utils/storage';
import {setToast} from '../../redux/action/global';

const PricingReport = ({navigation, route}: any) => {
  const {item} = route.params ?? {};
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [pricePromo, setPricePromo] = useState<string>('');
  const [isPromoAvailable, setIsPromoAvailable] = useState<boolean>(true);
  const [isPOSM, setIsPOSM] = useState<boolean>(true);
  const [labelMechanism, setLabelMechanism] = useState<string>('');
  const [isConfirmVisible, setIsConfirmVisible] = useState<boolean>(false);
  const [startShow, setStartShow] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endShow, setEndShow] = useState(false);
  const [endDate, setEndDate] = useState(new Date());
  const [isMechanismVisible, setIsMechanismVisible] = useState(false);

  const {mechanism} = useAppSelector(state => state.globalReducer);

  const dispatch = useAppDispatch();

  async function getMechanism() {
    await dispatch(getPricingMechanismAction());
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => {
      getMechanism();
      setRefreshing(false);
    });
  }, []);

  async function onHandleSubmit() {
    try {
      setIsConfirmVisible(false);
      if (isPromoAvailable && pricePromo?.length === 0) {
        dispatch(
          setToast({
            toastVisible: true,
            toastType: 'info',
            toastMessage: 'Price cannot be empty',
            toastDuration: 3000,
          }),
        );
      } else if (
        setDateView(startDate, 'DD-MM-YYYY')! >
        setDateView(endDate, 'DD-MM-YYYY')!
      ) {
        dispatch(
          setToast({
            toastVisible: true,
            toastType: 'info',
            toastMessage: 'Start date cannot be greater than end date',
            toastDuration: 3000,
          }),
        );
      } else {
        const sales_id = storage.getString('salesId');
        const data = {
          sales_id,
          product_id: item?.product_id,
          store_id: 'zteXoJuh',
          is_promo: isPromoAvailable ? 'YES' : 'NO',
          promo_price: isPromoAvailable ? parseInt(pricePromo) : 0,
          start_date: isPromoAvailable
            ? setDateView(startDate, 'YYYY-MM-DD')
            : null,
          end_date: isPromoAvailable
            ? setDateView(endDate, 'YYYY-MM-DD')
            : null,
          posm: isPOSM ? 'YES' : 'NO',
          mechanisme: labelMechanism,
          created_by: sales_id,
        };
        console.log(data);
        dispatch(postProductPriceAction(data, navigation));
      }
    } catch (err) {
      console.log(err);
    }
  }

  // ONCHANGE START DATE
  const onChangeStartDate = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setStartShow(false);
    setStartDate(currentDate);
  };
  // ONCHANGE END DATE
  const onChangeEndDate = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setEndShow(false);
    setEndDate(currentDate);
  };

  // MODAL DROPDOWN
  const changeModalVisibilityMechanism = (bool: boolean) => {
    setIsMechanismVisible(bool);
  };
  const setDataMechanism = (option: any, label: any) => {
    setLabelMechanism(label);
  };
  return (
    <View style={layout.page}>
      <FocusAwareStatusBar
        backgroundColor={bgColor2}
        barStyle={'dark-content'}
      />
      <Header title="Pricing" onPress={() => navigation.goBack()} />
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 10,
          paddingBlock: 50,
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Text
          style={[
            blackTextStyle,
            {
              fontSize: 24,
              fontFamily: FontFamily.poppinsSemiBold,
              textAlign: 'center',
            },
          ]}>
          Alfa Mart
        </Text>
        <Text
          style={[
            blackTextStyle,
            {
              fontSize: 16,
              textAlign: 'center',
            },
          ]}>
          {item?.product_name ?? '-'}
        </Text>
        <Gap height={16} />
        <View style={styles.contentContainer}>
          <View style={{borderBottomWidth: 1, borderColor: borderColor}}>
            <Text
              style={[
                blackTextStyle,
                {fontFamily: FontFamily.poppinsSemiBold},
              ]}>
              PROMO
            </Text>
          </View>
          <Gap height={8} />
          <View style={styles.radioBtnContainer}>
            <Text style={[blackTextStyle]}>Is promotion available?</Text>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setIsPromoAvailable(true)}
                style={styles.row}>
                <View
                  style={[
                    styles.dotContainer,
                    {
                      borderColor: isPromoAvailable ? greenColor : greyColor,
                    },
                  ]}>
                  {isPromoAvailable && (
                    <View
                      style={[
                        styles.dotCircle,
                        {
                          backgroundColor: greenColor,
                        },
                      ]}
                    />
                  )}
                </View>
                <Gap width={4} />
                <Text style={[blackTextStyle]}>Yes</Text>
              </TouchableOpacity>
              <Gap width={80} />
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setIsPromoAvailable(false)}
                style={styles.row}>
                <View
                  style={[
                    styles.dotContainer,
                    {
                      borderColor: !isPromoAvailable ? greenColor : greyColor,
                    },
                  ]}>
                  {!isPromoAvailable && (
                    <View
                      style={[
                        styles.dotCircle,
                        {
                          backgroundColor: greenColor,
                        },
                      ]}
                    />
                  )}
                </View>
                <Gap width={4} />
                <Text style={[blackTextStyle]}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
          {isPromoAvailable ? (
            <>
              <Gap height={12} />
              <Text style={[blackTextStyle]}>Promotional Price</Text>
              <Gap height={4} />
              <View style={styles.inputContainer}>
                <TextInput
                  value={pricePromo}
                  onChangeText={text => setPricePromo(text)}
                  keyboardType="numeric"
                  style={[
                    blackTextStyle,
                    {
                      borderRadius: 10,
                      padding: 8,
                    },
                  ]}
                />
              </View>
              <Gap height={12} />
              <Text style={[blackTextStyle]}>Period</Text>
              <Gap height={4} />
              <View style={[styles.row, {justifyContent: 'space-between'}]}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setStartShow(true)}
                  style={[styles.dateContainer]}>
                  <Text style={[blackTextStyle, {fontSize: 12}]}>
                    {setDateView(startDate, 'DD-MM-YYYY')}
                  </Text>
                  <IcMaterialCom
                    name={'calendar'}
                    size={24}
                    color={greyColor}
                  />
                </TouchableOpacity>
                <Text style={[blackTextStyle, {fontSize: 12}]}>to</Text>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setEndShow(true)}
                  style={[styles.dateContainer]}>
                  <Text style={[blackTextStyle, {fontSize: 12}]}>
                    {setDateView(endDate, 'DD-MM-YYYY')}
                  </Text>
                  <IcMaterialCom
                    name={'calendar'}
                    size={24}
                    color={greyColor}
                  />
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <></>
          )}
          <Gap height={12} />
          <View style={styles.radioBtnContainer}>
            <Text style={[blackTextStyle]}>POSM</Text>
            <Gap height={4} />
            <View
              style={{
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setIsPOSM(true)}
                style={styles.row}>
                <View
                  style={[
                    styles.dotContainer,
                    {
                      borderColor: isPOSM ? greenColor : greyColor,
                    },
                  ]}>
                  {isPOSM && (
                    <View
                      style={[
                        styles.dotCircle,
                        {
                          backgroundColor: greenColor,
                        },
                      ]}
                    />
                  )}
                </View>
                <Gap width={4} />
                <Text style={[blackTextStyle]}>Yes</Text>
              </TouchableOpacity>
              <Gap width={80} />
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setIsPOSM(false)}
                style={styles.row}>
                <View
                  style={[
                    styles.dotContainer,
                    {
                      borderColor: !isPOSM ? greenColor : greyColor,
                    },
                  ]}>
                  {!isPOSM && (
                    <View
                      style={[
                        styles.dotCircle,
                        {
                          backgroundColor: greenColor,
                        },
                      ]}
                    />
                  )}
                </View>
                <Gap width={4} />
                <Text style={[blackTextStyle]}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* <View
            style={[
              styles.inputContainer,
              {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              },
            ]}>
            <TextInput
              style={[
                blackTextStyle,
                {
                  width: '84%',
                  borderRadius: 10,
                  padding: 8,
                },
              ]}
            />
            <View style={styles.iconDropdown}>
              <IcMaterialCom name="chevron-down" size={24} color={blackColor} />
            </View>
          </View> */}
          <Gap height={12} />
          <Text style={[blackTextStyle]}>Procedure</Text>
          <Gap height={4} />
          <Dropdown
            visible={isMechanismVisible}
            data={mechanism ? mechanism : []}
            label={labelMechanism}
            height={40}
            setLabel={setLabelMechanism}
            setData={setDataMechanism}
            changeModalVisibility={changeModalVisibilityMechanism}
          />
          {/* <View
            style={[
              styles.inputContainer,
              {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              },
            ]}>
            <TextInput
              style={[
                blackTextStyle,
                {
                  width: '84%',
                  borderRadius: 10,
                  padding: 8,
                },
              ]}
            />
            <View style={styles.iconDropdown}>
              <IcMaterialCom name="chevron-down" size={24} color={blackColor} />
            </View>
          </View> */}
        </View>
        <Gap height={24} />
        <Button title="Save" onPress={() => setIsConfirmVisible(true)} />
      </ScrollView>
      {/* <View style={styles.footer}>
        <Button title="Save" onPress={() => setIsConfirmVisible(true)} />
      </View> */}

      {startShow && (
        <DateTimePicker
          testID="dateTimePicker"
          value={startDate}
          mode={'date'}
          onChange={onChangeStartDate}
        />
      )}
      {endShow && (
        <DateTimePicker
          testID="dateTimePicker"
          value={endDate}
          mode={'date'}
          onChange={onChangeEndDate}
        />
      )}

      <ModalConfirmation
        visible={isConfirmVisible}
        confirmText="Save this pricing product"
        onClose={() => setIsConfirmVisible(false)}
        onTapBackground={() => setIsConfirmVisible(false)}
        onConfirm={onHandleSubmit}
      />
    </View>
  );
};

export default PricingReport;

const styles = StyleSheet.create({
  contentContainer: {
    width: '100%',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: borderColor,
    backgroundColor: whiteColor,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dotContainer: {
    width: 14,
    height: 14,
    borderRadius: 14 / 2,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotCircle: {
    width: 8,
    height: 8,
    borderRadius: 8 / 2,
  },
  inputContainer: {
    width: '100%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: greyColor,
  },
  dateContainer: {
    width: '45%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 8,
    borderWidth: 1,
    borderColor: greyColor,
    borderRadius: 10,
  },
  footer: {
    width: '100%',
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: 'transparent',
  },
  iconDropdown: {
    width: '15%',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  radioBtnContainer: {
    borderWidth: 1,
    borderColor: borderColor,
    backgroundColor: bgColor,
    borderRadius: 10,
    padding: 8,
  },
});
