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
import React, {useCallback, useRef, useState} from 'react';
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
import {setToast} from '../../redux/action/global';
import {postProductStockAction} from '../../redux/action/osa';
import {storage} from '../../utils/storage';
import {
  Camera,
  useCameraDevice,
  useCameraFormat,
} from 'react-native-vision-camera';
import {setDateView} from '../../utils/helper';
import {
  globalMarker,
  presenceMarker,
  storeVisitMarker,
} from '../../utils/watermarkPhoto';
import RNFS from 'react-native-fs';
import ImageResizer from '@bam.tech/react-native-image-resizer';
import useGetLocation from '../../hooks/useGetLocation';

const OSAReport = ({navigation, route}: any) => {
  const {item} = route.params ?? {};
  const {lat, lng} = useGetLocation();
  const [isStockAvailable, setIsStockAvailable] = useState<boolean>(true);
  const [isPhotoViewVisible, setisPhotoViewVisible] = useState<boolean>(false);
  const [isTakePhotoVisible, setisTakePhotoVisible] = useState<boolean>(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState<boolean>(false);
  const [fileNameImg, setFileNameImg] = useState<string | undefined>('');
  const [fileImgBase64, setFileImgBase64] = useState<string | undefined>('');
  const [stock, setStock] = useState<string>('');
  const device = useCameraDevice('back');
  const [isCameraReady, setIsCameraReady] = useState<boolean>(false);
  const camera = useRef<Camera>(null);

  const {height} = useWindowDimensions();

  const format = useCameraFormat(device, [
    {photoAspectRatio: 4 / 3},
    {photoResolution: {width: 1280, height: 720}},
  ]);

  const onInitialized = useCallback(() => {
    setIsCameraReady(true);
  }, [isCameraReady]);

  const dispatch = useAppDispatch();

  async function onHandlePhoto() {
    try {
      const d = new Date();
      const date = await setDateView(d, 'DD-MMMM-YYYY');
      const time = await setDateView(d, 'HH:mm:ss');
      const name = await storage.getString('fullName');
      const userId = await storage.getString('salesId');
      const loc = {lat, lng};
      if (camera.current && isCameraReady) {
        const photo = await camera.current.takeSnapshot({quality: 80});
        const photoMarker = await globalMarker(
          photo?.path,
          loc,
          'STOCK',
          date!,
          time!,
          name!,
          userId!,
        );
        // NOTE: RESIZE
        // const result = await ImageResizer.createResizedImage(
        //   photoMarker,
        //   800,
        //   800,
        //   'JPEG',
        //   80,
        //   0,
        //   undefined,
        //   false,
        // );
        // NOTE: GENERATE BASE64
        const base64 = await RNFS.readFile(photoMarker, 'base64');
        // navigation.navigate('StoreVisitPhotoPreview', {base64, store});
      } else {
        dispatch(
          setToast({
            toastVisible: true,
            toastType: 'warning',
            toastMessage: 'Camera is not ready or ref is missing.',
            toastDuration: 4000,
          }),
        );
      }
    } catch (err) {
      console.log(err);
    }
  }

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

  if (device == null) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: bgColor2,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={[blackTextStyle, {fontSize: 24}]}>No Camera Device</Text>
      </View>
    );
  }
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
              onLongPress={() => setisTakePhotoVisible(true)}
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
              onPress={() => setisTakePhotoVisible(true)}
              style={[styles.imgContainer, {padding: 8}]}>
              <IcMaterialCom name={'camera'} size={40} color={whiteColor} />
              <Text style={[whiteTextStyle, {textAlign: 'center'}]}>
                Click here to take photo evidence
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
      {/* // NOTE: MODAL TAKE PHOTO */}
      <Modal visible={isTakePhotoVisible} animationType="fade" transparent>
        <View style={{flex: 1}}>
          <Camera
            ref={camera}
            style={[StyleSheet.absoluteFill, {height: height}]}
            device={device}
            isActive={isCameraReady}
            format={format}
            photo
            isMirrored
            outputOrientation="device"
            onInitialized={onInitialized}
          />
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setisTakePhotoVisible(false)}
            style={[
              styles.btn,
              styles.btnClose,
              {backgroundColor: 'transparent'},
            ]}>
            <IcMaterialCom name="close" size={32} color={whiteColor} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onHandlePhoto}
            style={[styles.btn, styles.btnCamera]}>
            <IcMaterialCom name="camera" size={32} color={blackColor} />
          </TouchableOpacity>
        </View>
      </Modal>
      {/* // NOTE: MODAL PHOTO PREVIEW */}
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
  btn: {
    width: 64,
    height: 64,
    borderRadius: 64 / 2,
    backgroundColor: whiteColor,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnCamera: {
    bottom: 30,
    alignSelf: 'center',
  },
  btnClose: {
    top: 0,
    right: 0,
  },
});
