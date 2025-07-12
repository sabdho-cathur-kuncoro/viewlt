/* eslint-disable radix */
/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
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
  blackRGBAColor,
  blackTextStyle,
  borderColor,
  FontFamily,
  greenColor,
  greyColor,
  greySecondaryColor,
  whiteColor,
  whiteTextStyle,
} from '../../constant/theme';
import IcMaterialCom from 'react-native-vector-icons/MaterialCommunityIcons';
import {useAppDispatch} from '../../redux/hooks';
import {launchImageLibrary} from 'react-native-image-picker';
import {setToast} from '../../redux/action/global';
import {postProductStockAction} from '../../redux/action/osa';
import {storage} from '../../utils/storage';

const OSAReport = ({navigation, route}: any) => {
  const {item} = route.params ?? {};
  const [isStockAvailable, setIsStockAvailable] = useState<boolean>(true);
  const [isPhotoViewVisible, setisPhotoViewVisible] = useState<boolean>(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState<boolean>(false);
  const [fileNameImg, setFileNameImg] = useState<string | undefined>('');
  const [fileImgBase64, setFileImgBase64] = useState<string | undefined>('');
  const [stock, setStock] = useState<string>('');

  const {height} = useWindowDimensions();

  const dispatch = useAppDispatch();

  async function onHandleSubmit() {
    try {
      setIsConfirmVisible(false);
      const sales_id = storage.getString('salesId');
      const data = {
        sales_id,
        product_id: item?.product_id,
        store_id: 'zteXoJuh',
        is_stock_available: isStockAvailable ? 'YES' : 'NO',
        stock: isStockAvailable ? parseInt(stock) : 0,
        created_by: sales_id,
      };
      console.log(data);
      await dispatch(postProductStockAction(data, navigation));
    } catch (err) {
      console.log(err);
    }
  }

  // NOTE: IMAGE PICKER
  const pickImage = async () => {
    let options: any = {
      mediaType: 'photo',
      includeBase64: true,
      quality: 0.7,
    };
    const result = await launchImageLibrary(options);
    if (result.assets) {
      let imgBase64 = result.assets[0]?.base64;
      let imgFileName = result.assets[0]?.fileName;
      setFileImgBase64(imgBase64);
      setFileNameImg(imgFileName);
      return;
    } else if (result.didCancel) {
      dispatch(
        setToast({
          toastVisible: true,
          toastType: 'warning',
          toastMessage: 'User cancel',
          toastDuration: 3000,
        }),
      );
      return;
    } else if (result.errorCode === 'permission') {
      dispatch(
        setToast({
          toastVisible: true,
          toastType: 'warning',
          toastMessage: 'Permission not allowed',
          toastDuration: 3000,
        }),
      );
      return;
    } else if (result.errorCode === 'camera_unavailable') {
      dispatch(
        setToast({
          toastVisible: true,
          toastType: 'warning',
          toastMessage: 'Camera not available on device',
          toastDuration: 3000,
        }),
      );
      return;
    } else if (result.errorCode === 'others') {
      dispatch(
        setToast({
          toastVisible: true,
          toastType: 'warning',
          toastMessage:
            result.errorMessage ?? 'Something Happened, Please try again later',
          toastDuration: 3000,
        }),
      );
      return;
    }
  };
  return (
    <View style={layout.page}>
      <FocusAwareStatusBar
        backgroundColor={bgColor2}
        barStyle={'dark-content'}
      />
      <Header
        title="On Shelf Availability"
        onPress={() => navigation.goBack()}
      />
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 10,
          paddingBlock: 50,
        }}>
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
          {item?.product_name}
        </Text>
        <Gap height={16} />
        <View style={styles.container}>
          <View style={{borderBottomWidth: 1, borderColor: borderColor}}>
            <Text
              style={[
                blackTextStyle,
                {fontFamily: FontFamily.poppinsSemiBold},
              ]}>
              STOCK
            </Text>
          </View>
          <Gap height={4} />
          <Text style={[blackTextStyle]}>Are stocks available?</Text>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setIsStockAvailable(true)}
              style={styles.row}>
              <View
                style={[
                  styles.dotContainer,
                  {
                    borderColor: isStockAvailable ? greenColor : greyColor,
                  },
                ]}>
                {isStockAvailable && (
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
              onPress={() => setIsStockAvailable(false)}
              style={styles.row}>
              <View
                style={[
                  styles.dotContainer,
                  {
                    borderColor: !isStockAvailable ? greenColor : greyColor,
                  },
                ]}>
                {!isStockAvailable && (
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
          <Gap height={12} />
          <Text style={[blackTextStyle]}>Photo evidence</Text>
          <Gap height={4} />
          {fileImgBase64 !== '' ? (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setisPhotoViewVisible(true)}
              onLongPress={pickImage}
              style={[styles.imgContainer]}>
              <Image
                source={{uri: `data:image/jpeg;base64,${fileImgBase64}`}}
                style={{width: '100%', height: '100%', borderRadius: 10}}
                resizeMode="cover"
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={pickImage}
              style={[styles.imgContainer, {padding: 8}]}>
              <IcMaterialCom name={'camera'} size={40} color={whiteColor} />
              <Text style={[whiteTextStyle, {textAlign: 'center'}]}>
                Click on the photo above to upload photo evidence
              </Text>
            </TouchableOpacity>
          )}
          {fileImgBase64 !== '' ? (
            <Text style={[blackTextStyle]}>{fileNameImg ?? ''}</Text>
          ) : (
            <></>
          )}
          <Gap height={12} />
          <Text style={[blackTextStyle]}>Stock</Text>
          <Gap height={4} />
          <View style={styles.inputContainer}>
            <TextInput
              value={stock}
              onChangeText={text => setStock(text)}
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
        </View>
        <Gap height={24} />
        <Button title="Save" onPress={() => setIsConfirmVisible(true)} />
        {/* <View style={styles.footer}></View> */}
      </ScrollView>
      {/* // NOTE: MODAL PHOTO */}
      <Modal visible={isPhotoViewVisible} animationType="fade" transparent>
        <TouchableWithoutFeedback>
          <View style={styles.modalContainer}>
            <View
              style={{
                width: '80%',
                height: height * 0.8,
              }}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setisPhotoViewVisible(false)}
                style={styles.modalImgContainer}>
                <Image
                  source={{uri: `data:image/jpeg;base64,${fileImgBase64}`}}
                  style={{width: '100%', height: '100%'}}
                  resizeMode="contain"
                />
                <Gap height={8} />
                <Text
                  style={[
                    blackTextStyle,
                    {fontFamily: FontFamily.poppinsSemiBold},
                  ]}>
                  Tap image to close
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <ModalConfirmation
        visible={isConfirmVisible}
        confirmText="Save this OSA report"
        onClose={() => setIsConfirmVisible(false)}
        onTapBackground={() => setIsConfirmVisible(false)}
        onConfirm={onHandleSubmit}
      />
    </View>
  );
};

export default OSAReport;

const styles = StyleSheet.create({
  container: {
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
  imgContainer: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    backgroundColor: greySecondaryColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: blackRGBAColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalImgContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    width: '100%',
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: 'transparent',
  },
});
