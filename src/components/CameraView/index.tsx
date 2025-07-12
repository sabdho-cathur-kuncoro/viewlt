/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useCallback} from 'react';
import {
  bgColor2,
  blackColor,
  blackTextStyle,
  whiteColor,
} from '../../constant/theme';
import {
  Camera,
  useCameraDevice,
  useCameraFormat,
} from 'react-native-vision-camera';
import IcMaterialCom from 'react-native-vector-icons/MaterialCommunityIcons';
import useCamera from '../../hooks/useCamera';

const CameraView = ({isActive, onPress}: any) => {
  const {camera, isCameraReady, actions} = useCamera();
  const device = useCameraDevice('back');

  const format = useCameraFormat(device, [
    {videoAspectRatio: 16 / 9},
    {videoResolution: {width: 1280, height: 720}},
    {fps: 60},
  ]);
  console.log({isCameraReady});
  console.log({camera: camera.current});

  const onInitialized = useCallback(() => {
    console.log('Camera initialized!');
    actions.onSetIsCameraReady(true);
  }, [isCameraReady]);

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
      <View style={{flex: 1}}>
        <Camera
          ref={camera}
          photo={true}
          style={StyleSheet.absoluteFill}
          device={device}
          format={format}
          isActive={isActive}
          onInitialized={onInitialized}
        />
      </View>
      {isCameraReady && isActive ? (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => actions.onTakePhoto()}
          style={styles.btnCamera}>
          <IcMaterialCom name="camera" size={32} color={blackColor} />
        </TouchableOpacity>
      ) : (
        <></>
      )}
    </View>
  );
};

export default CameraView;

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
