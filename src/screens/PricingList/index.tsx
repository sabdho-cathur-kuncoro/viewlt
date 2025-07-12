/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  bgColor2,
  blackTextStyle,
  FontFamily,
  whiteColor,
} from '../../constant/theme';
import {FocusAwareStatusBar, Header} from '../../components';
import {FlashList} from '@shopify/flash-list';
import {wait} from '../../utils/helper';
import LottieView from 'lottie-react-native';
import {lottieFiles} from '../../assets';
// import {dummySKU} from '../../utils/dummy';
import {useIsFocused} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {getProductAction} from '../../redux/action/product';
import {sortbyName} from '../../utils/sort';

const PricingList = ({navigation}: any) => {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [dataList, SetDataList] = useState<any[]>([]);

  const {isLoading} = useAppSelector(state => state.globalReducer);

  const isFocused = useIsFocused();
  const dispatch = useAppDispatch();

  useEffect(() => {
    isFocused && getData();
  }, [isFocused]);

  async function getData() {
    try {
      // SetDataList(dummySKU);
      const res = await dispatch(getProductAction());
      // console.log(res);
      SetDataList(res?.result);
    } catch (err) {
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
        onPress={() => navigation.navigate('PricingReport', {item})}
        style={styles.cardContainer}>
        <Text
          style={[
            blackTextStyle,
            {fontSize: 12, fontFamily: FontFamily.poppinsSemiBold},
          ]}>
          {item.product_name}
        </Text>
        {/* <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{width: '69%'}}>
            <Text style={[blackTextStyle, {fontSize: 12}]}>
              {item.sku_name}
            </Text>
          </View>
          <View
            style={{
              width: '30%',
              alignItems: 'center',
            }}>
            <Text style={[blackTextStyle, {fontSize: 12}]}>QTY</Text>
            <Text style={[blackTextStyle, {fontSize: 12}]}>{item.qty} pcs</Text>
          </View>
        </View> */}
      </TouchableOpacity>
    );
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => {
      getData();
      setRefreshing(false);
    });
  }, []);
  return (
    <View style={styles.page}>
      <FocusAwareStatusBar
        backgroundColor={bgColor2}
        barStyle={'dark-content'}
      />
      <Header title="Pricing" onPress={() => navigation.goBack()} />
      <View style={{flex: 1}}>
        <FlashList
          data={dataList && dataList.sort(sortbyName)}
          keyExtractor={keyExtractor}
          renderItem={renderItemFlashlist}
          ListEmptyComponent={renderEmptyComponent}
          estimatedItemSize={20}
          contentContainerStyle={{
            paddingHorizontal: 14,
            paddingTop: 6,
            paddingBottom: 20,
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
    </View>
  );
};

export default PricingList;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: bgColor2,
  },
  cardContainer: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: whiteColor,
    marginBottom: 16,
  },
});
