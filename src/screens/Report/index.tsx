/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {layout} from '../../constant/style';
import {
  Button,
  FocusAwareStatusBar,
  Gap,
  Header,
  ModalConfirmation,
} from '../../components';
import {
  bgColor2,
  blackColor,
  blackTextStyle,
  FontFamily,
  whiteColor,
} from '../../constant/theme';
import IcMaterialCom from 'react-native-vector-icons/MaterialCommunityIcons';
import {coc, homeShelf, secShelf} from '../../assets';
import {useAppDispatch} from '../../redux/hooks';
import {setToast} from '../../redux/action/global';
import {StackActions} from '@react-navigation/native';

const Report = ({navigation, route}: any) => {
  const {store_id} = route.params ?? {};
  const [isConfirmVisible, setIsConfirmVisible] = useState<boolean>(false);
  const {height} = useWindowDimensions();
  const dispatch = useAppDispatch();

  async function onHandleSubmit() {
    try {
      dispatch(
        setToast({
          toastVisible: true,
          toastType: 'success',
          toastMessage: 'Report visit Success',
          toastDuration: 3000,
        }),
      );
      navigation.dispatch(StackActions.pop(2));
    } catch (err) {
      console.log(err);
    } finally {
      setIsConfirmVisible(false);
    }
  }
  return (
    <View style={layout.page}>
      <FocusAwareStatusBar
        backgroundColor={bgColor2}
        barStyle={'dark-content'}
      />
      <Header title="Report" onPress={() => navigation.goBack()} />
      <View
        style={{
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <IcMaterialCom name={'file-document'} size={104} color={blackColor} />
        <Text
          style={[
            blackTextStyle,
            {
              fontFamily: FontFamily.poppinsSemiBold,
              fontSize: 24,
              textAlign: 'center',
            },
          ]}>
          Report
        </Text>
      </View>
      <Gap height={24} />
      <View style={layout.paddingH}>
        <View style={styles.row}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() =>
              navigation.navigate('ReportPhoto', {reportType: 1, store_id})
            }
            style={{
              width: '47%',
              alignItems: 'center',
            }}>
            <View style={[styles.cardContainer, {minHeight: height * 0.2}]}>
              <Image
                source={homeShelf}
                style={{width: 80, height: 80}}
                resizeMode="contain"
              />
            </View>
            <Gap height={4} />
            <Text
              style={[
                blackTextStyle,
                {fontFamily: FontFamily.poppinsSemiBold, fontSize: 16},
              ]}>
              Homeshelf
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() =>
              navigation.navigate('ReportPhoto', {reportType: 2, store_id})
            }
            style={{
              width: '47%',
              alignItems: 'center',
            }}>
            <View style={[styles.cardContainer, {minHeight: height * 0.2}]}>
              <Image
                source={coc}
                style={{width: 80, height: 80}}
                resizeMode="contain"
              />
            </View>
            <Gap height={4} />
            <Text
              style={[
                blackTextStyle,
                {
                  fontFamily: FontFamily.poppinsSemiBold,
                  fontSize: 16,
                  textAlign: 'center',
                },
              ]}>
              COC Cashier
            </Text>
          </TouchableOpacity>
        </View>
        <Gap height={8} />
        <View style={[styles.row, {width: '100%', justifyContent: 'center'}]}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() =>
              navigation.navigate('ReportPhoto', {reportType: 3, store_id})
            }
            style={{
              width: '47%',
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            <View style={[styles.cardContainer, {minHeight: height * 0.2}]}>
              <Image
                source={secShelf}
                style={{width: 80, height: 80}}
                resizeMode="contain"
              />
            </View>
            <Gap height={4} />
            <Text
              style={[
                blackTextStyle,
                {fontFamily: FontFamily.poppinsSemiBold, fontSize: 16},
              ]}>
              Secondary Display
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          paddingVertical: 8,
          paddingHorizontal: 24,
          backgroundColor: bgColor2,
          alignItems: 'center',
        }}>
        <Button
          title={'Save Report'}
          onPress={() => setIsConfirmVisible(true)}
        />
      </View>
      <ModalConfirmation
        visible={isConfirmVisible}
        confirmText="Save this report store visit"
        onClose={() => setIsConfirmVisible(false)}
        onTapBackground={() => setIsConfirmVisible(false)}
        onConfirm={onHandleSubmit}
      />
    </View>
  );
};

export default Report;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: whiteColor,
    borderRadius: 24,
  },
});
