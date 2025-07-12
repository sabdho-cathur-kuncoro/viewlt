/* eslint-disable react-native/no-inline-styles */
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React from 'react';
// import {lottieFiles} from '../../assets';
// import LottieView from 'lottie-react-native';
import {primaryColor} from '../../constant/theme';

const LoadingGlobal = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={'large'} color={primaryColor} />
      {/* <LottieView
        style={{width: 50, height: 50}}
        source={lottieFiles.loading}
        autoPlay
        loop
      /> */}
    </View>
  );
};

export default LoadingGlobal;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0, 0.1)',
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    zIndex: 99,
  },
});
