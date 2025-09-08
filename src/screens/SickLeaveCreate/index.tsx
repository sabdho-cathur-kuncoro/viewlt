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
  greyColor,
  greySecondaryColor,
  greyThirdColor,
  subTextStyle,
  whiteColor,
  whiteTextStyle,
} from '../../constant/theme';
import {layout} from '../../constant/style';
import DateTimePicker from '@react-native-community/datetimepicker';
import IcMaterialCom from 'react-native-vector-icons/MaterialCommunityIcons';
import {setDateView} from '../../utils/helper';
import {storage} from '../../utils/storage';
import {
  Camera,
  useCameraDevice,
  useCameraFormat,
} from 'react-native-vision-camera';
import {useAppDispatch} from '../../redux/hooks';
import useGetLocation from '../../hooks/useGetLocation';
import {globalMarker} from '../../utils/watermarkPhoto';
import ImageResizer from '@bam.tech/react-native-image-resizer';
import RNFS from 'react-native-fs';
import {setToast} from '../../redux/action/global';

const SickLeaveCreate = ({navigation}: any) => {
  const {lat, lng} = useGetLocation();
  const [isPhotoViewVisible, setisPhotoViewVisible] = useState<boolean>(false);
  const [isTakePhotoVisible, setisTakePhotoVisible] = useState<boolean>(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState<boolean>(false);
  const [fileNameImg, setFileNameImg] = useState<string | undefined>('');
  const [fileImgBase64, setFileImgBase64] = useState<string | undefined>('');
  const [startShow, setStartShow] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
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
      const date = setDateView(d, 'DD-MMMM-YYYY');
      const time = setDateView(d, 'HH:mm:ss');
      const name = storage.getString('fullName');
      const userId = storage.getString('salesId');
      const loc = {lat, lng};
      if (camera.current && isCameraReady) {
        const photo = await camera.current.takePhoto();
        const photoMarker = await globalMarker(
          photo?.path,
          loc,
          'SICK LEAVE',
          date!,
          time!,
          name!,
          userId!,
        );
        // NOTE: RESIZE
        const result = await ImageResizer.createResizedImage(
          photoMarker,
          800,
          800,
          'JPEG',
          80,
          0,
          undefined,
          false,
        );
        // NOTE: GENERATE BASE64
        const base64 = await RNFS.readFile(result.path, 'base64');
        // navigation.navigate('StoreVisitPhotoPreview', {base64, store});
      } else {
        dispatch(
          setToast({
            toastVisible: true,
            toastType: 'warning',
            toastMessage: 'Camera is not ready yet.',
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
      //   const data = {
      //     sales_id,
      //     product_id: item?.product_id,
      //     store_id: 'zteXoJuh',
      //     is_stock_available: isStockAvailable ? 'YES' : 'NO',
      //     stock: isStockAvailable ? parseInt(stock) : 0,
      //     created_by: sales_id,
      //   };
      //   console.log(data);
      //   await dispatch(postProductStockAction(data, navigation));
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
    <View style={[layout.page]}>
      <FocusAwareStatusBar
        backgroundColor={bgColor2}
        barStyle={'dark-content'}
      />
      <Header title="Sick Leave Create" onPress={() => navigation.goBack()} />
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={[
          layout.paddingH,
          {paddingTop: 16, paddingBottom: 50},
        ]}>
        <View
          style={[
            {
              backgroundColor: whiteColor,
              borderRadius: 16,
              paddingVertical: 16,
            },
            layout.paddingH,
          ]}>
          <Text style={[blackTextStyle]}>Sick Leave Letter (Photo)</Text>
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
              <IcMaterialCom name={'camera'} size={40} color={greyColor} />
              <Text style={[subTextStyle, {textAlign: 'center'}]}>
                Click here to take photo evidence
              </Text>
            </TouchableOpacity>
          )}
          {fileImgBase64 !== '' ? (
            <Text style={[blackTextStyle]}>{fileNameImg ?? ''}</Text>
          ) : (
            <></>
          )}
          <Gap height={10} />
          <Text style={[blackTextStyle]}>Date</Text>
          <View style={[styles.input]}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setStartShow(true)}
              style={[styles.dateContainer]}>
              <Text style={[blackTextStyle, {fontSize: 12}]}>
                {setDateView(startDate, 'DD-MM-YYYY')}
              </Text>
              <IcMaterialCom name={'calendar'} size={24} color={greyColor} />
            </TouchableOpacity>
          </View>
          <Gap height={10} />
          <Text style={[blackTextStyle]}>Note</Text>
          <View style={[styles.input, {height: 80}]}>
            <TextInput style={[blackTextStyle]} multiline />
          </View>
          <Gap height={20} />
          <Button
            title="Send Request"
            onPress={() => setIsConfirmVisible(true)}
          />
        </View>
      </ScrollView>
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
      {startShow && (
        <DateTimePicker
          testID="dateTimePicker"
          value={startDate}
          mode={'date'}
          onChange={onChangeStartDate}
        />
      )}
      <ModalConfirmation
        visible={isConfirmVisible}
        confirmText="Request Sick leave permission"
        onClose={() => setIsConfirmVisible(false)}
        onTapBackground={() => setIsConfirmVisible(false)}
        onConfirm={onHandleSubmit}
      />
    </View>
  );
};

export default SickLeaveCreate;

const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: 48,
    borderRadius: 16,
    backgroundColor: greyThirdColor,
    borderWidth: 1,
    borderColor: borderColor,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imgContainer: {
    width: '100%',
    height: 250,
    borderRadius: 16,
    backgroundColor: greyThirdColor,
    borderWidth: 1,
    borderColor: borderColor,
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
});
