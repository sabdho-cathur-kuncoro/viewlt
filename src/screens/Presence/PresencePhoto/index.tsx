/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useCallback, useRef, useState} from 'react';
import {
  bgColor2,
  blackColor,
  blackTextStyle,
  whiteColor,
} from '../../../constant/theme';
import {FocusAwareStatusBar, Header} from '../../../components';
import {
  Camera,
  useCameraDevice,
  useCameraFormat,
} from 'react-native-vision-camera';
import {useIsFocused} from '@react-navigation/native';
import IcMaterialCom from 'react-native-vector-icons/MaterialCommunityIcons';
import ImageResizer from '@bam.tech/react-native-image-resizer';
import RNFS from 'react-native-fs';
import {useAppDispatch} from '../../../redux/hooks';
import {setToast} from '../../../redux/action/global';
import {presenceMarker} from '../../../utils/watermarkPhoto';
import {setDateView} from '../../../utils/helper';
import {storage} from '../../../utils/storage';
// import {getImageMetaData, Image} from 'react-native-compressor';

const PresencePhoto = ({navigation, route}: any) => {
  const {type, loc} = route.params ?? {};
  const device = useCameraDevice('front');
  const [isCameraReady, setIsCameraReady] = useState<boolean>(false);
  const camera = useRef<Camera>(null);
  const isFocused = useIsFocused();
  const dispatch = useAppDispatch();
  const {height} = useWindowDimensions();

  const format = useCameraFormat(device, [
    {photoAspectRatio: 4 / 3},
    {photoResolution: {width: 1280, height: 720}},
  ]);

  const onInitialized = useCallback(() => {
    setIsCameraReady(true);
  }, [isCameraReady]);

  async function onHandlePhoto() {
    try {
      const d = new Date();
      const date = setDateView(d, 'DD-MMMM-YYYY');
      const time = setDateView(d, 'HH:mm:ss');
      const fullname = storage.getString('fullName');
      const userId = storage.getString('salesId');
      if (camera.current && isCameraReady) {
        const photo = await camera.current.takePhoto();
        const photoMarker = await presenceMarker(
          photo?.path,
          loc,
          type,
          date!,
          time!,
          fullname!,
          userId!,
        );
        console.log(photoMarker);
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
        navigation.navigate('PresencePhotoPreview', {type, base64, loc});
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
    <View style={styles.page}>
      <FocusAwareStatusBar
        backgroundColor={bgColor2}
        barStyle={'dark-content'}
      />
      <Header
        title={type === 1 ? 'Clock In' : 'Clock Out'}
        onPress={() => navigation.goBack()}
      />
      <View style={{flex: 1}}>
        <Camera
          ref={camera}
          style={[StyleSheet.absoluteFill, {height: height}]}
          device={device}
          isActive={isFocused}
          format={format}
          photo
          isMirrored
          outputOrientation="device"
          onInitialized={onInitialized}
        />
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onHandlePhoto}
          style={styles.btnCamera}>
          <IcMaterialCom name="camera" size={32} color={blackColor} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PresencePhoto;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: bgColor2,
  },
  btnCamera: {
    width: 64,
    height: 64,
    borderRadius: 64 / 2,
    backgroundColor: whiteColor,
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
