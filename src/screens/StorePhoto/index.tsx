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
import {layout} from '../../constant/style';
import {FocusAwareStatusBar, Header} from '../../components';
import {
  bgColor2,
  blackColor,
  blackTextStyle,
  whiteColor,
} from '../../constant/theme';
import {setToast} from '../../redux/action/global';
import {
  Camera,
  useCameraDevice,
  useCameraFormat,
} from 'react-native-vision-camera';
import {useAppDispatch} from '../../redux/hooks';
import {useIsFocused} from '@react-navigation/native';
import IcMaterialCom from 'react-native-vector-icons/MaterialCommunityIcons';
import RNFS from 'react-native-fs';
import ImageResizer from '@bam.tech/react-native-image-resizer';
import {setDateView} from '../../utils/helper';
import {storage} from '../../utils/storage';
import {storeVisitMarker} from '../../utils/watermarkPhoto';

const StorePhoto = ({navigation, route}: any) => {
  const {store, loc} = route.params ?? {};
  const [isCameraReady, setIsCameraReady] = useState<boolean>(false);
  const device = useCameraDevice('back');
  const camera = useRef<Camera>(null);

  const isFocused = useIsFocused();
  const dispatch = useAppDispatch();

  const {height} = useWindowDimensions();

  const format = useCameraFormat(device, [
    {photoAspectRatio: 4 / 3},
    {photoResolution: {width: 1280, height: 720}},
  ]);

  const onInitialized = useCallback(() => {
    console.log('Camera initialized!');
    setIsCameraReady(true);
  }, [isCameraReady]);

  async function onHandlePhoto() {
    try {
      const d = new Date();
      const date = await setDateView(d, 'DD-MMMM-YYYY');
      const time = await setDateView(d, 'HH:mm:ss');
      const name = await storage.getString('fullName');
      const userid = await storage.getString('salesId');
      if (camera.current && isCameraReady) {
        const photo = await camera.current.takePhoto();
        const data = {
          ...store,
          photoPath: photo.path,
          loc,
          date,
          time,
          name,
          userid,
        };
        const photoMarker = await storeVisitMarker(data);
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
        navigation.navigate('StoreVisitPhotoPreview', {base64, store});
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
    <View style={[layout.page]}>
      <FocusAwareStatusBar
        backgroundColor={bgColor2}
        barStyle={'dark-content'}
      />
      <Header title="Store Photo" onPress={() => navigation.goBack()} />
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

export default StorePhoto;

const styles = StyleSheet.create({
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
