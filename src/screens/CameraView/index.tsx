/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  bgColor2,
  blackColor,
  blackTextStyle,
  whiteColor,
  whiteTextStyle,
} from '../../constant/theme';
import {FocusAwareStatusBar, Header} from '../../components';
import {Camera, useCameraDevice} from 'react-native-vision-camera';
import {useIsFocused} from '@react-navigation/native';
import IcMaterialCom from 'react-native-vector-icons/MaterialCommunityIcons';
import useCamera from '../../hooks/useCamera';

const CameraView = ({navigation, onPress}: any) => {
  const {camera, actions} = useCamera();
  const device = useCameraDevice('back');
  const isFocused = useIsFocused();

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
        backgroundColor={blackColor}
        barStyle={'light-content'}
      />
      <Header
        title={'Camera'}
        bgColor={blackColor}
        titleColor={whiteTextStyle}
        iconColor={whiteColor}
        onPress={() => navigation.goBack()}
      />
      <View style={{flex: 1}}>
        <Camera
          ref={camera}
          photo={true}
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={isFocused}
        />
      </View>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPress}
        style={styles.btnCamera}>
        <IcMaterialCom name="camera" size={32} color={blackColor} />
      </TouchableOpacity>
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
